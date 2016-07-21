////////////////////INFORMATION//////////////////////////////////////////////////
//Automated Meter Reading File Handler///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Created By: Jake Uskoski///////////////////////////////////////////////////////
//Created On: May 5, 2015////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Last Modified By: Jake Uskoski/////////////////////////////////////////////////
//Last Modified On: June 11, 2015////////////////////////////////////////////////
//Email: jake.uskoski@maintenanceassistant.com///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Version Number: 1.4.1//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Maintenance Assistant//////////////////////////////////////////////////////////
//www.maintenanceassistant.com///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


////////////////////INITIALIZATION///////////////////////////////////////////////
//Begins the program/////////////////////////////////////////////////////////////
document.getElementById("title").innerHTML = ////////////////////////////////////
    "MA Labs Automated Meter Reading Handler v1.4";//////////////////////////////
program();///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


////////////////////LOCAL STORAGE FUNCTIONS//////////////////////////////////////
//Grabs the local storage, or make one if it doesn't exist///////////////////////
function fetchStorage(strName) {
    //Fetches the requested local storage
    var varValue = localStorage.getItem(strName);
    
    //Creates the local storage if it doesn't exist
    if(varValue === null) {
        varValue = localStorage.setItem(strName, "1");
        return 1;
    } else {
        //Returns the value of the requested local storage as an integer
        return parseInt(varValue);
    }
}///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Increments the value of the last checked file//////////////////////////////////
function storageInc(strName) {
    //Gets the requested local storage
    var intInc = fetchStorage(strName);
    //Takes the value of the requested local storage and increments it
    intInc = parseInt(intInc) + 1;
    //Saves the new value to the local storage
    localStorage.setItem(strName, intInc.toString());
}/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


////////////////////FORMATTING FUNCTIONS/////////////////////////////////////////
//Formats the file name for a clean input////////////////////////////////////////
function stringFormat(objConfig) {
    //Formats the path of the file to be read for the fetchFileDB function
    var intStorage = fetchStorage("fileList");
    var strFormat = "data/" + intStorage + objConfig.FNames;

    //Outputs for the user
    document.getElementById("currentFile").innerHTML = "Current file: " + intStorage + objConfig.FNames + "<br>";
    document.getElementById("currentFile").innerHTML += "Next file: " + (intStorage + 1) + objConfig.FNames;

    return strFormat;
}/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Formats the current time///////////////////////////////////////////////////////
function formatTime(increase) {
    var d = new Date(),
        strTime,
        seconds = d.getSeconds() + increase,
        minutes = d.getMinutes(),
        hours = d.getHours();

    //Properly pushes the increased amount of time into the date data, keeping proper format
    while(seconds > 59) {
        seconds -= 60;
        minutes += 1;
        if(minutes > 59) {
            minutes -= 60;
            hours += 1;
        }
        if(hours > 23) {
            hours -= 24;
        }
    }

    //Puts a string together, adding 0's for formatting where neccessary
    if(hours < 10) {strTime = "0" + hours;} else {strTime = '' + hours;};
    if(minutes < 10) {strTime += ":0" + minutes;} else {strTime += ":" + minutes;};
    if(seconds < 10) {strTime += ":0" + seconds;} else {strTime += ":" + seconds;};

    return strTime;
}////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Clears the visible page of all old data.///////////////////////////////////////
function clear() {
    document.getElementById("currentFile").innerHTML = '';
    document.getElementById("statusDetails").innerHTML = '';
    document.getElementById("batchPrep").innerHTML = '';
    document.getElementById("items").innerHTML = '';
    document.getElementById("batch").innerHTML = '';
    document.getElementById("batchStatus").innerHTML = '';
    document.getElementById("batchFinal").innerHTML = '';
    document.getElementById("delay").innerHTML = '';
    document.getElementById("counter").innerHTML = '';
}/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


////////////////////FILE FETCH FUNCTIONS/////////////////////////////////////////
//Gets the configuration information/////////////////////////////////////////////
function fetchConfig() {
    var def = new $.Deferred,
        arrData,
        arrConfig = new Array(13),
        intLength,
        j = 0,
        blnFlag = false,
        objConfig = new Object(),
        data;

    //Reads the config.txt file
    $.get("config/config.txt", function(data) {
        //Separates by line
        data = data.replace('\r', '');
        arrData = data.split(/\n/);
        intLength = arrData.length;

        //Reads through each line, looking for ones beginning with a tilde ('~')
        for(var i = 0; i < intLength; i += 1) {
            if(arrData[i].charAt(0) === '~') {
                //Removes the tilde and puts the data into a temporary placeholder array
                arrData[i] = arrData[i].replace('~','');
                arrConfig[j] = arrData[i];

                //Checks for fatal errors and inconsistencies in the config.txt
                switch(j) {

                    //API URL
                    case 0:
                    //Application Key
                    case 1:
                    //Access Key
                    case 2:
                    //API Secret Key
                    case 3:
                    //File Name
                    case 10:
                        if(arrConfig[j] === '') {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty.<br>";
                        }
                        break;

                    //Meter Reading Only
                    case 4:
                    //Quotation Wrapping
                    case 6:
                    //File And Position Tracking Reset
                    case 18:
                        if((parseInt(arrConfig[j]) !== 0) && (parseInt(arrConfig[j]) !== 1)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Not a 0 or 1.<br>";
                        } else {
                            arrConfig[j] = (parseInt(arrConfig[j]) !== 0) ? true : false;
                        }
                        break;

                    //Delimiter
                    case 5:
                        if(arrConfig[j].search(/(\.|[0-9])/) !== -1) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j +
                                ". Contains a \".\" or 0-9.<br>";
                        }
                        if(arrConfig[j] === '') {
                            arrConfig[j] = ',';
                        }
                        break;

                    //Automatic Date Reading
                    case 7:
                        if((parseInt(arrConfig[j]) !== 0) && (parseInt(arrConfig[j]) !== 1)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Not a 0 or 1.<br>";
                        } else if((parseInt(arrConfig[j]) === 0) && (parseInt(arrConfig[4]) === 1)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Required on.<br>";
                        } else {
                            arrConfig[j] = (parseInt(arrConfig[j]) !== 0) ? true : false;
                        }
                        break;

                    //Set Default ID
                    case 8:
                        arrConfig[j] = arrConfig[j].replace(/(,|\s+)/g, '');
                        if((isNaN(parseInt(arrConfig[j])) === true) && (parseInt(arrConfig[4]) === 0) && (arrConfig[j] !== '')) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Not a number.<br>";
                        } else if((isNaN(parseInt(arrConfig[j])) === true) && (parseInt(arrConfig[4]) === 1)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Not a number or empty.<br>";
                        }
                        break;

                    //Set Default Unit
                    case 9:
                        if((arrConfig[j] === '') && (parseInt(arrConfig[4]) === 1)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty.<br>";
                        }
                        break;

                    //Assed ID Column Header
                    case 11:
                        if((arrConfig[j] === '') && (arrConfig[4] === 0) && (arrConfig[6] === '')) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty.<br>";
                        }
                        break;

                    //Meter Reading Value Column Header
                    case 12:
                        if((arrConfig[j] === '') && (parseInt(arrConfig[4]) === 0)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty.<br>";
                        }
                        break;

                    //Meter Reading Value Unit Measurement Column Header
                    case 13:
                        if((arrConfig[j] === '') && (arrConfig[4] === 0) && (arrConfig[7] === '')) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty.<br>";
                        }
                        break;

                    //Date Column Header
                    case 14:
                        if((arrConfig[j] === '') && (arrConfig[4] === 0) && (arrConfig[5] === 0)) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty.<br>";
                        }
                        break;

                    //Nothing required for Work Order ID Column Header

                    //Maximum Batch Requests Per Minute
                    case 16:
                        if(isNaN(parseInt(arrConfig[j])) === true) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty or not a number.<br>";
                        }
                        break;

                    //Time Delay Between Files
                    case 17:
                        if(isNaN(parseInt(arrConfig[j])) === true) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Empty or not a number.<br>";
                        } else if(parseInt(arrConfig[j]) === 0) {
                            blnFlag = true;
                            document.getElementById("statusDetails").innerHTML +=
                                "STATUS DETAILS: Issue with configuration setting " + j + ". Cannot enter \"0\".<br>";
                        }
                        break;
                }

                //Increments the position of the temporary placeholder array
                j += 1;
            }
        }

        //Checks that there are exactly 13 pieces of readable data in the config.txt
        if(j !== 19) {
            blnFlag = true;
            document.getElementById("statusDetails").innerHTML +=
                "STATUS DETAILS: Issue with configuration settings. Either missing or has extra settings." +
                " Check lines beginning with \"~\".<br>";
        }

        //Checks if there's anything immediately code-breaking in the config.txt data
        if(blnFlag === false) {
            //Places the config.txt data into an object for easier handling
            //API SETUP
            objConfig.APIURL = arrConfig[0];
            objConfig.APIKey = arrConfig[1];
            objConfig.APIAcs = arrConfig[2];
            objConfig.APISrt = arrConfig[3];
            //FORMAT SETUP
            objConfig.FmtMRO = arrConfig[4];
            objConfig.FmtDlr = arrConfig[5];
            objConfig.FmtQWD = arrConfig[6];
            objConfig.FmtADR = arrConfig[7];
            objConfig.FmtDID = arrConfig[8];
            objConfig.FmtDUt = arrConfig[9];
            //FILE SETUP
            objConfig.FNames = arrConfig[10];
            objConfig.FleAID = arrConfig[11];
            objConfig.FleMRd = arrConfig[12];
            objConfig.FleMRU = arrConfig[13];
            objConfig.FleDtS = arrConfig[14];
            objConfig.FleWID = arrConfig[15];
            //BATCHING SETUP
            objConfig.MaxBtc = parseInt(arrConfig[16]);
            objConfig.FDelay = parseInt(arrConfig[17]);
            //RESET
            objConfig.Reboot = arrConfig[18];

            def.resolve(objConfig);
        } else {
            //If the configuration data is improper
            def.resolve(false);
        }

    }).fail(function() {
        //In case of a failed promise
        def.resolve(false);
    });

    return def.promise();
}///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Gets the information for units from the CMMS server////////////////////////////
function fetchUnitDB(maCmmsClient) {
    var def = new $.Deferred();

    //Fetches the Unit information from the server
    maCmmsClient.find({
        "className": "MeterReadingUnit",
        "fields": "strName, id",
        "callback": function(ret) {
            if(!ret.error) {
                //Reports a successful fetching of the unit data and returns the information
                document.getElementById("status").innerHTML =
                    "STATUS: Successfully fetched the unit information from the server.";
                def.resolve(ret.objects);
            } else {
                //Outputs a failure to the user and returns a failure to break out of the current iteration of the runnable loop
                document.getElementById("status").innerHTML =
                    "STATUS: Attempt to fetch the unit information from the server was unsuccessful.";
                def.resolve(false);
            }
        }
    });
    
    return def.promise();
}///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Gets CSV file into Javascript//////////////////////////////////////////////////
function fetchFileDB(objUnitDB, objConfig) {
    var newData,
        objFormatted,
        intLength,
        intDBLength,
        posID,
        posValue,
        posUnit,
        posDate,
        posWorkID,
        strDlr,
        tempArr,
        blnFlag = false,
        def = new $.Deferred();

    //Fetch the current file to be read
    $.get(stringFormat(objConfig), function(data) {

        //Checks if the config.txt dictates "Meter Reading Only" or not
        if(objConfig.FmtMRO === false) {
            //Separates the file into an array of items
            data = data.replace(/\r/g, "\n");
            data = data.replace(/\n\n/g, "\n");
            data = data.split("\n");

            //Splits the first line of the file, the header row, into single entries
            //Taking into consideration Quotation Wrapping ("data","data")
            if(objConfig.FmtQWD === true) {
                strDlr = "\"" + objConfig.FmtDlr + "\"";
                newData = data[0].split(strDlr);
                newData[0] = newData[0].replace(/"/, '');
                newData[newData.length - 1] = newData[newData.length - 1].replace(/"/, '');
            } else {
                newData = data[0].split(objConfig.FmtDlr);
            }

            intLength = newData.length;
            
            //Finds the columns to be read from the file data based on the config.txt settings
            for(var i = 0; i < intLength; i += 1) {
                if((newData[i] === objConfig.FleAID) && (objConfig.FmtDID === false)) posID = i;
                if(newData[i] === objConfig.FleMRd) {posValue = i;}
                if((newData[i] === objConfig.FleMRU) && (objConfig.FmtDUt === '')) posUnit = i;
                if((newData[i] === objConfig.FleDtS) && (objConfig.FmtADR === false)) posDate = i;
                if((newData[i] === objConfig.FleWID) && (objConfig.FleWID !== '')) posWorkID = i;
            }

            //Checks for any missing headers, and reports them to the user
            if(
                ((posID === undefined) && (objConfig.FmtDID === false)) ||
                (posValue === undefined) ||
                ((posUnit === undefined) && (objConfig.FmtDUt === '')) ||
                ((posDate === undefined) && (objConfig.FmtADR === false))
            ){
                    document.getElementById("statusDetails").innerHTML =
                        "STATUS DETAILS: File did not contain one or more of the required headings:<br><ul>";
                if((posID === undefined) && (objConfig.FmtDID === false)) {
                    document.getElementById("statusDetails").innerHTML += "<li>" + objConfig.FleAID + "</li>";
                }
                if(posValue === undefined) {
                    document.getElementById("statusDetails").innerHTML += "<li>" + objConfig.FleMRd + "</li>";
                }
                if((posUnit === undefined) && (objConfig.FmtDUt === '')) {
                    document.getElementById("statusDetails").innerHTML += "<li>" + objConfig.FleMRU + "</li>";
                }
                if((posDate === undefined) && (objConfig.FmtADR === false)) {
                    document.getElementById("statusDetails").innerHTML += "<li>" + objConfig.FleDtS + "</li>";
                }
                if((posWorkID === undefined) && (objConfig.FleWID !== '')) {
                    document.getElementById("statusDetails").innerHTML += "<li>" + objConfig.FleWID + "</li>";
                }
                document.getElementById("statusDetails").innerHTML +=
                    "<br></ul>STATUS DETAILS: Please either fix the file headings, or change the configuration files." +
                    "<br>STATUS DETAILS: Changing the configuration files will require restarting the program after.";

                //Jumps out of the function before formatting and skips the batch recursion,
                //reaching the cycleEnd function to wait for the next runnable loop iteration
                def.resolve(false);
                return def.promise();
            }

            //Prepares for the loop of inserting data to the array
            intLength = data.length;
            objFormatted = new Array(intLength-1);

            //Takes all of the data from the file and places it into an array of objects
            for(var i = 1; i < intLength; i += 1) {
                tempArr =  (objConfig.FmtQWD === true) ? data[i].split(strDlr) : data[i].split(objConfig.FmtDlr);
                tempArr[0] = tempArr[0].replace(/"/, '');
                tempArr[tempArr.length - 1] = tempArr[tempArr.length - 1].replace(/"/, '');

                //Builds the object
                objFormatted[i-1] = new Object();
                objFormatted[i-1].intAssetID = (objConfig.FmtDID === '') ? tempArr[posID] : objConfig.FmtDID;
                objFormatted[i-1].dblMeterReading = tempArr[posValue];
                objFormatted[i-1].intMeterReadingUnitsID = (objConfig.FmtDUt === '') ? tempArr[posUnit] : objConfig.FmtDUt;
                objFormatted[i-1].dtmDateSubmitted = (objConfig.FmtADR === false) ? Date.parse(tempArr[posDate]) : Date.parse(Date());
                if((posWorkID !== undefined) && (tempArr[posWorkID] !== '')) {
                    objFormatted[i-1].intWorkOrderID = tempArr[posWorkID];
                }
            }

        //"Meter Reading Only" data Pull
        } else {
            //Convert the file into an array
            data = data.replace(/\r/g, "\n");
            data = data.replace(/\n\n/g, "\n");
            data = data.split("\n");


            intLength = data.length;
            objFormatted = new Array(intLength);
            document.getElementById("statusDetails").innerHTML = '';

            for(var i = 0; i < intLength; i += 1) {
                //Check the line to make sure it's a meter reading
                if((isNaN(data[i]) === true) || (isNaN(parseFloat(data[i])) === true)) {
                    blnFlag = true;
                    document.getElementById("statusDetails").innerHTML +=
                        "STATUS DETAILS: Error with item " + (i + 1) + " - \"" + data[i] + "\" is not a number, or empty<br>";
                }

                //Set up the object
                objFormatted[i] = new Object();
                objFormatted[i].intAssetID = objConfig.FmtDID;
                objFormatted[i].dblMeterReading = data[i];
                objFormatted[i].intMeterReadingUnitsID = objConfig.FmtDUt;
                objFormatted[i].dtmDateSubmitted =  Date.parse(Date());
            }
        }

        if(blnFlag === true) {
            document.getElementById("statusDetails").innerHTML +=
                "STATUS DETAILS: File " + (fetchStorage("fileName") + 1) + objConfig.FNames + " will be reattempted in " +
                objConfig.FDelay + " minutes<br>" + "STATUS DETAILS: Please fix the file data before the next file read attempt";
            document.getElementById("statusDetails").innerHTML += "<br>Splitter setting: " + objConfig.FmtDlr;

            //Jumps out of the function before formatting and skips the batch recursion,
            //reaching the cycleEnd function to wait for the next runnable loop iteration
            def.resolve(false);
            return def.promise();
        }

        //Prepares for the next loop
        intLength = objFormatted.length;
        intDBLength = objUnitDB.length;

        //Outputs for the user
        document.getElementById("items").innerHTML = "Current file contains " + intLength + " items to be batched";

        //Sets all of the unit data to server item IDs, so that they can be properly batched
        for(var i = 0; i < intLength; i += 1) {
            //Resets the flag for the next item
            blnFlag = false;

            //Checks the current item against all unit data to find a match,
            //and replaces the string with an ID integer if a match is found
            for(var j = 0; j < intDBLength; j += 1) {
                if(objFormatted[i].intMeterReadingUnitsID.toUpperCase() === objUnitDB[j].strName.toUpperCase()) {
                    objFormatted[i].intMeterReadingUnitsID = objUnitDB[j].id;
                    blnFlag = true;
                }
                //Breaks out of the loop for the current item if it has already been assigned an ID, for saving time
                if(blnFlag === true) {break;}
            }

            //Checks if the current item being formatted did not have a match with the server's unit data
            if(blnFlag === false) {
                document.getElementById("statusDetails").innerHTML =
                    "STATUS DETAILS: Error with row " + (i + 2) + "'s unit data - \"" + objFormatted[i].intMeterReadingUnitsID +
                    "\" is not registered in the database<br>" +
                    "STATUS DETAILS: File " + (fetchStorage("fileName") + 1) + objConfig.FNames +
                    " will be reattempted in " + objConfig.FDelay + " minutes.<br>" +
                    "STATUS DETAILS: Please either fix the file data or add the missing unit to " +
                    "the CMMS before the next file read attempt.";
                
                //Ends the function and 0 to force the program to skip the pushBatch
                //recursion and skips to the beginning of the next runnable loop iteration
                def.resolve(false);
                return def.promise();
            }
        }

        def.resolve(objFormatted);

    }).fail(function() {
        //For a failed $.get, there was an issue or the file didn't exist
        document.getElementById("statusDetails").innerHTML = "STATUS DETAILS: File " +
            (fetchStorage("fileName") + 1) + objConfig.FNames + " was unsuccessfully fetched or does not exist";
        def.resolve(false);
    });

    return def.promise();
}///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


////////////////////BATCH FUNCTIONS///////////////////////////////////////////////
//Pings the server to check for a correct API setup///////////////////////////////
function ping(maCmmsClient) {
    var def = new $.Deferred();

    //Pings the server, checking for a connection
    maCmmsClient.rpc({
        "name": "Ping",
        "callback": function(ret) {
            //Returns a success or failure
            if (!ret.error) {
                def.resolve(true);
            } else {
                def.resolve(false);
            }
        }
    });

    return def.promise();
}///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//Uses the formatted data to create an array for batching/////////////////////////
function prepBatch(maCmmsClient, objFormatted, objConfig) {
    var intLength = objFormatted.length,
        arrBatchDB,
        arrPushDB,
        intPosition = 0,
        intCount = 0,
        k,
        holder;

    //Prepares the arrays to the lengths of the file data and total amount of batches
    arrBatchDB = new Array(intLength);
    arrPushDB = new Array(Math.ceil(intLength/objConfig.MaxBtc));

    //Prepares all of the individual rows of data
    for(var i = 0; i < intLength; i += 1) {
        arrBatchDB[i] = {
            "className": "MeterReading",
            "object": objFormatted[i],
            "fields": "id, intAssetID, dblMeterReading, dv_intMeterReadingUnitsID"
        };
    }

    //Groups the rows into batch requests, preparing them to be sent later
    for(var j = 0; (j * objConfig.MaxBtc) < intLength; j += 1) {
        
        //Creates an array of proper length based on the remaining number of items
        if ((intLength - intCount) < objConfig.MaxBtc) {
            //Sets up for the remainder of the items (less than a full batch)
            arrPushDB[j] = new Array(intLength - intCount);
        } else {
            //Sets up for a full batch (there's at least the maximum batch size of items available)
            arrPushDB[j] = new Array(objConfig.MaxBtc);
        }
    
        //Prepares to package the next batch from where the previous left off
        k = 0;
        holder = intPosition + objConfig.MaxBtc;
    
        //Creates a batch request
        for(var i = intPosition; ((i < holder) && (i < intLength)); i += 1) {
            arrPushDB[j][k] = maCmmsClient.prepareAdd(arrBatchDB[i]);
            intPosition += 1;
            k += 1;
        }

        //Tracks the position of the batches within the file
        intCount += objConfig.MaxBtc;

        //Outputs for the user
        document.getElementById("batchPrep").innerHTML =
            "Batches: " + (j + 1) + "/" + (Math.ceil(intLength/objConfig.MaxBtc)) + " prepared";
    }

    return arrPushDB;
}/////////////////
//////////////////////////////////////////////////////////////////////////////////
//Recursive batching function, pushes a batch to the server once a minute/////////
function pushBatch(maCmmsClient, objConfig, arrToPush, j, intError) {
    var objPush,
        intLength = arrToPush.length;

    //Tells the user that the program is attempting a request instead of giving a time for when it will happen
    document.getElementById("delay").innerHTML = "Time of next batch request: Sending...";

    //Prepares the request to get sent to the CMMS
    objPush = {
        "requests": arrToPush[j],
        "callback": function(ret) {
            if(!ret.error) {
                //Moves to the next batch waiting to be sent to the server
                j += 1;

                //Outputs for the user
                document.getElementById("status").innerHTML = "STATUS: Sending batch requests.";
                document.getElementById("batch").innerHTML = "Batches completed: " + j + "/" + intLength;
                document.getElementById("batchStatus").innerHTML = "Batch " + j + " successful.";

                //Checks for the end of the pre-prepared batches
                if(j !== intLength) {
                    //Increments the position within the file in case of failure
                    storageInc("filePosition");

                    //Calls the pushBatch function after a minute delay for the next iteration of the recursion
                    document.getElementById("delay").innerHTML = "Time of next batch request: " + formatTime(61);
                    document.getElementById("delay").innerHTML += "<br>The program can be safely exited currently.";

                    //Delay a minute before recursion, clearing the error count
                    setTimeout(function(){pushBatch(maCmmsClient, objConfig, arrToPush, j, 0);}, 61*1000);
                } else {
                    //Stops calling the pushBatch recursion
                    //Increments the value of which file is to be read & resets the position in the file for the next one
                    storageInc("fileList");
                    localStorage.setItem("filePosition", "0");

                    //Outputs for the user
                    document.getElementById("batch").innerHTML = "Batches completed: " + j + "/" + intLength;
                    document.getElementById("batchFinal").innerHTML = "File " + fetchStorage("fileList") + " completed.";

                    //Moves back into the Runnable loop
                    endCycle(maCmmsClient, objConfig);
                }
            } else {
                //Reduces the amount of remaining errors for the current batch
                intError += 1;
                //Outputs for the user
                document.getElementById("status").innerHTML = "STATUS: Sending batch requests.";
                document.getElementById("batch").innerHTML = "Batches completed: " + j + "/" + intLength;
                document.getElementById("batchStatus").innerHTML =
                    "Batch " + (j + 1) + " unsuccessful. " + (10 - intError) + " attempts left";

                //Checks if the current batch has no remaining errors
                if(intError !== 10) {
                    //Continues attempting, going back into recursion on the same batch
                    document.getElementById("delay").innerHTML = "Time of next batch request:" + formatTime(61);
                    document.getElementById("delay").innerHTML += "<br>The program can be safely exited currently.";

                    //Reattempt the batch after a minute
                    setTimeout(function(){pushBatch(maCmmsClient, objConfig, arrToPush, j, intError);}, 61*1000);
                } else {
                    //Stops calling the pushBatch recursion,
                    //exiting out of the batch recursion and returning to the runnable recursion
                    document.getElementById("batchFinal").innerHTML =
                        "File " + fetchStorage("fileList") + objConfig.FNames + " was not completed";
                    endCycle(maCmmsClient, objConfig);
                }
            }
        }
    }

    //sends the batch request. This is the real magic
    maCmmsClient.batch(objPush);
}///////
//////////////////////////////////////////////////////////////////////////////////


////////////////////EXECUTION FUNCTIONS///////////////////////////////////////////
//Program Function, gets the configuration file data and begins the program///////
function program() {
    var prmConfig,
        maCmmsClient,
        retPing;

    //Clears the error report of there being an issue with the JavaScript if the script works
    document.getElementById("status").innerHTML = '';
    document.getElementById("statusDetails").innerHTML = '';

    //gets the config.txt data
    prmConfig = fetchConfig();
    prmConfig.then(function(objConfig) {
        if(objConfig !== 0) {
            document.getElementById("status").innerHTML = "STATUS: Successfully obtained config.txt.";
            
            //API Connection Setup
            maCmmsClient = new MaCmmsClient();
            maCmmsClient.setBaseUri(objConfig.APIURL);
            maCmmsClient.setAppKey(objConfig.APIKey);
            maCmmsClient.setAuthToken(objConfig.APIAcs);
            maCmmsClient.setPKey(objConfig.APISrt);

            //Pings the server to check if the API was properly set up
            retPing = ping(maCmmsClient);
            retPing.then(function(prmPing) {
                if(prmPing !== false) {
                    document.getElementById("status").innerHTML = "STATUS: CMMS successfully called.";
                    
                    //Resets the position tracking if required by the config.txt
                    if(objConfig.Reboot === true) {
                        localStorage.setItem("fileList","1");
                        localStorage.setItem("filePosition","0");
                    }
                    
                    //Begins running the program
                    runnable(maCmmsClient, objConfig);
                } else {
                    //Outputs failure for user
                    document.getElementById("status").innerHTML = "STATUS: Unable to proceed. CMMS could not be called.";
                    document.getElementById("statusDetails").innerHTML =
                        "STATUS DETAILS: Either unable to connect to the internet or the API is not properly set up.";
                    document.getElementById("statusDetails").innerHTML =
                        "API Setup requirements in config.txt may be improperly set up.";
                }
            }).fail(function() {
                //In case of a failed promise
                document.getElementById("status").innerHTML = "STATUS: Unable to proceed. CMMS could not be called.";
                document.getElementById("statusDetails").innerHTML = "STATUS DETAILS: Ending program.";
            });
        } else {
            //Outputs for the user
            document.getElementById("status").innerHTML = "STATUS: Failed to fetch config.txt file.";
            document.getElementById("statusDetails").innerHTML += "STATUS DETAILS: Ending program.";
        }
    }).fail(function() {
        //In case of failed promise
        document.getElementById("status").innerHTML = "STATUS: Failed to fetch config.txt file.";
        document.getElementById("statusDetails").innerHTML += "STATUS DETAILS: Ending program.";
    });
}////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//Control Function, runs the program//////////////////////////////////////////////
function runnable(maCmmsClient, objConfig) {
    var prmDB,
        prmFile,
        objUnitDB,
        objFormattedDB,
        arrPush;

    //Wipes the html page
    clear();

    //Gets the server's IDs for the different measurements
    objUnitDB = fetchUnitDB(maCmmsClient);
    objUnitDB.then(function(prmDB) {
        
        //If the unit IDs were successfully obtained, continues
        if(prmDB !== false) {

            //Finds and formats the designated file
            objFormattedDB = fetchFileDB(prmDB, objConfig);
            objFormattedDB.then(function(prmFile) {
                
                //If there is a valid file, continues
                if(prmFile !== false){
                    
                    //Prepares to begin batching
                    document.getElementById("status").innerHTML = "STATUS: CSV file successfully found and formatted.";
                    arrPush = prepBatch(maCmmsClient, prmFile, objConfig);

                    //Recursive batch call basedon the file read and the last known position of the file, if it failed earlier
                    pushBatch(maCmmsClient, objConfig, arrPush, fetchStorage("filePosition"), 0);
                } else {
                    //Outputs for the user, and prepares for the next iteration of the runnable loop
                    document.getElementById("status").innerHTML = "STATUS: Failed to obtain or format the CSV file data.";
                    endCycle(maCmmsClient, objConfig);
                }
            }).fail(function() {
                //In case of a failed promise
                document.getElementById("status").innerHTML =
                    "STATUS: Failed to find the CSV file " + (localStorage.getItem("fileList") + 1) + objConfig.FNames + ".";
                endCycle(maCmmsClient, objConfig);
            });
        } else {
            endCycle(maCmmsClient, objConfig);
        }
    }).fail(function() {
        //In case of a failed promise
        document.getElementById("status").innerHTML =
            "STATUS: Attempt to fetch the unit information from the server was unsuccessful.";
        endCycle(maCmmsClient, objConfig);
    });
}////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//Cleanup Code////////////////////////////////////////////////////////////////////
function endCycle(maCmmsClient, objConfig) {
    //Creates a loop back into the runnable
    document.getElementById("delay").innerHTML = "Time of next file read:" + formatTime(objConfig.FDelay*60) + "<br>";
    document.getElementById("delay").innerHTML += "The program can be safely exited currently.";
    setTimeout(function() {runnable(maCmmsClient, objConfig);}, objConfig.FDelay*60*1000);
}////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////