MA Labs Automated Meter Reading File Handler V.1.4
--------------------------------------------------
- - -
<br>


TABLE OF CONTENTS
-----------------

1. [Authors & Contributors](#01.00.00)  
2. [Introduction](#02.00.00)  
3. [Requirements](#03.00.00)  
4. [Installation](#04.00.00)  
5. [Setup](#05.00.00)  
6. [Configuration](#06.00.00)  
   [6.1 API Setup](#06.01.00)  
   [6.2 Format Setup](#06.02.00)  
   [6.3 File Setup](#06.03.00)  
   [6.4 Batch Setup](#06.04.00)  
   [6.5 Reset](#06.05.00)  
7. [Running](#07.00.00)  
8. [Troubleshooting](#08.00.00)  
   [8.1 API Connecting](#08.01.00)  
   [8.2 Adding Units](#08.02.00)  
9. [Licensing](#09.00.00)  
10. [Alternative](#10.00.00)  
   [10.1 SimpleHTTPServer](#10.01.00)  
11. [Examples](#11.00.00)  
   [11.1 1data.csv](#11.01.00)  
   [11.2 2data.csv](#11.02.00)  
   [11.3 3data.csv](#11.03.00)  
   [11.4 4data.csv](#11.04.00)  
   [11.5 5data.csv](#11.05.00)  
   [11.6 6data.csv](#11.06.00)  
   [11.7 7data.csv](#11.07.00)  
   [11.8 8data.csv](#11.08.00)  
12. [Changelog](#12.00.00)  

<br>

1  AUTHORS &amp; CONTRIBUTORS                            <a id="01.00.00"></a>
-----------------------------

v1.0.0 Created May 5,   2015 by Jake Uskoski  
v1.1.0 Created May 8,   2015 by Jake Uskoski  
v1.2.0 Created May 12,  2015 by Jake Uskoski  
v1.3.0 Created May 21,  2015 by Jake Uskoski  
v1.4.0 Created June 4,  2015 by Jake Uskoski  
v1.4.1 Created June 11, 2015 by Jake Uskoski

<br>


2  INTRODUCTION                                          <a id="02.00.00"></a>
---------------

The Automated Meter Reading File Handler is a program which takes CSV files from
its designated folder, formats the necessary information, and sends the data to
the Maintenance Assistant CMMS, through the use of the Maintenance Assistant
JavaScript API. The program runs as an html page in an internet browser.

For convenience, this program uses Brackets to open and run the html script. A
file which can run without Brackets is included, and explained in the
"ALTERNATIVE" section.

Before attempting to run the program, please be sure to extract all of the files
from the "Automated Meter Reading Handler v.1.4.zip" file. The program cannot be
run from the zip file.

For a simple step-by-step guide to setting up this program, see the file named
"Step-By-Step Beginner Guide.txt".

<br>


3  REQUIREMENTS                                          <a id="03.00.00"></a>
---------------

1. A modern web browser, preferably Google Chrome
  * Other options include IE9+, Opera 15+, Firefox, Safari 6+
2. Brackets text editor, with or without Extract by Adobe
  * Available at [http://brackets.io/][br]
3. A stable internet connection

  [br]:  http://brackets.io/

<br>


4  INSTALLATION                                          <a id="04.00.00"></a>
---------------

The Automated Meter Reading File Handler program requires no installation, but
in order to run the program, either Brackets or an alternative solution for
hosting a server is required. Brackets can be downloaded from the following
web page:

&nbsp;&nbsp;&nbsp;[http://brackets.io/][br]

with or without Adobe Extract. If using the alternative solution provided by
this README, see the "ALTERNATIVE" section.

<br>


5  SETUP                                                 <a id="05.00.00"></a>
--------

Within the program folder where the runnable.html file is located, there is a
folder named "data" which is used for placing CSV files in. The files must be
named using the following format:

&nbsp;&nbsp;&nbsp;&#60;number\>&#60;name\>.csv

The &#60;name\> must be the same for every file, and the numbers must increment
naturally, beginning at 1. For example:

&nbsp;&nbsp;&nbsp;1data.csv  
&nbsp;&nbsp;&nbsp;2data.csv  
&nbsp;&nbsp;&nbsp;3data.csv  
&nbsp;&nbsp;&nbsp;...  
&nbsp;&nbsp;&nbsp;15data.csv  

The default configuration setting uses "data.csv" as the filename, but can
be configured. The configuration file must be prepared before the first run, or
else the program will fail to function. See "CONFIGURATION" for more details.

<br>


6  CONFIGURATION                                         <a id="06.00.00"></a>
----------------

The configuration file, located in the "config" folder and named "config.txt",
has four categories:

1. API Setup
2. Format Setup
3. File Setup
4. Batching Setup
5. Reset

All lines that take output to the program are preceded by a tilde ("~").
Removing the tilde from before a line will stop it from being read by the
program, and adding additional tildes to the beginning of lines will cause
errors which will prevent the program from reading the config.txt file. To
prevent any errors from occurring within the configuration, avoid using, adding,
and deleting tildes.

For example files using the various optional unrequired settings, see section
11.


### 6.1  API SETUP ###                                   <a id="06.01.00"></a>

The API setup has four requirements:

&nbsp;&nbsp;&nbsp;0:  API URL                                             - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;1:  Application Key                                     - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;2:  Access Key                                          - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;3:  API Secret Key                                      - \[REQUIRED]

To learn about getting your API keys, go to the web page:

&nbsp;&nbsp;&nbsp;[http://www.maintenanceassistant.com/api/docs/guide.html][doc]

and see the section "Getting your API Access Keys".

[doc]: http://www.maintenanceassistant.com/api/docs/guide.html


### 6.2  FORMAT SETUP ###                                <a id="06.02.00"></a>

The Format setup has two requirements and three optional values:

&nbsp;&nbsp;&nbsp;4:  [Meter Reading Only](#06.02.04)                                 - \[REQUIRED] \[TOGGLE]  
&nbsp;&nbsp;&nbsp;5:  [Delimiter](#06.02.05)                                          - \[NOT REQUIRED]  
&nbsp;&nbsp;&nbsp;6:  [Quotation Wrapped Data](#06.02.06)                             - \[REQUIRED] \[TOGGLE]  
&nbsp;&nbsp;&nbsp;7:  [Automatic Date Reading](#06.02.07)                             - \[REQUIRED] \[TOGGLE]  
&nbsp;&nbsp;&nbsp;8:  [Set Default ID](#06.02.08)                                     - \[NOT REQUIRED]  
&nbsp;&nbsp;&nbsp;9:  [Set Default Unit](#06.02.09)                                   - \[NOT REQUIRED]


#### 4:  Meter Reading Only ####                         <a id="06.02.04"></a>

This setting is for cases where the files being placed in the "data" folder only
contain a single column (or single string) of meter reading data, and nothing
else.


#### 5:  Delimiter ####                                  <a id="06.02.05"></a>

The Delimiter setting, when left blank, defaults to using the comma (","), the
basic delimiter of CSV files. If the CSV files being placed in the "data" folder
have a different delimiter than the comma, then it may be entered into this
setting.

An example would be using the vertical bar ("|") or ampersand ("&amp;") instead of
the comma as the delimiter for the CSV files.

&nbsp;&nbsp;&nbsp;id,Meter Reading,Unit,Date  
&nbsp;&nbsp;&nbsp;id|Meter Reading|Unit|Date  
&nbsp;&nbsp;&nbsp;id&amp;Meter Reading&amp;Unit&amp;Date

**NOTE:**  
The delimiter can be any length, not just one character, but it must remain
identical throughout the file, and must be the same for all files in the "data"
folder. Using different delimiters will result in the data not being separated
properly, leading to improper amounts of batches and continuously failing
attempts to send data to the CMMS.


#### 6:  Quotation Wrapped Data ####                     <a id="06.02.06"></a>

The Quotation Wrapped Data setting is for if the program used to generate CSV
files wraps all data in quotations. This is common for CSV files, and allows for
use of the delimiter within the CSV data, in cases such as notes or description
columns, without ruining the parsing of the data.

In the following example, the headings "Meter, Reading" and "Meter, Unit" would
be left alone.

&nbsp;&nbsp;&nbsp;"id","Meter, Reading","Meter, Unit","Date"

Without the quotation wrapping, such as the following example, the headings
would be separated into "id", "Meter", " Reading", "Meter", " Unit", "Date"

&nbsp;&nbsp;&nbsp;id,Meter, Reading,Meter, Unit,Date


#### 7:  Automatic Date Reading ####                     <a id="06.02.07"></a>

The Automatic Date Reading setting causes the program to override the Date
Column Header setting (13) in the File Setup section, instead using the time
the item was read from the file by the program. If the Meter Reading Only
setting (4) is toggled on, then the Automatic Date Reading setting is
required to be on as well, but the Automatic Date Reading setting can also be
toggled on without the Meter Reading Only setting.


#### 8:  Set Default ID ####                             <a id="06.02.08"></a>

Similar to the Automatic Date Reading setting (6), the Set Default ID
setting will override the Asset ID Column Header setting (10) and attach
whatever ID that has been entered in the Set Default ID setting to each meter
reading, regardless of any IDs in the file.

Like the Automatic Date Reading setting (6), the Set Default ID setting is
required when the Meter Reading Only setting (4) is toggled on.


#### 9:  Set Default Unit ####                           <a id="06.02.09"></a>

Similar to the Set Default ID setting (7), the Set Default Unit setting will
override the Meter Reading Value Unit Measurement Column Header setting (12)
and attach whatever unit that has been entered in the Set Default Unit setting
to each meter reading, regardless of any units in the file.


### 6.3  FILE SETUP ###                                  <a id="06.03.00"></a>

The file setup has five requirements and an optional value:

&nbsp;&nbsp;&nbsp;10: [File Name](#06.03.10)                                          - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;11: [Asset ID Column Header](#06.03.11)                             - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;12: [Meter Reading Value Column Header](#06.03.12)                  - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;13: [Meter Reading Value Unit Measurement Column Header](#06.03.13) - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;14: [Date Column Header](#06.03.14)                                 - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;15: [Work Order ID Column Header](#06.03.15)                        - \[NOT REQUIRED]


#### 10: File Name ####                                  <a id="06.03.10"></a>

File Name refers to the names given to all of the
files in the "data" folder. The name must include the ".csv" and cannot include
any numbers. Leaving the File Name empty ("~") results in a fatal error.


#### 11: Asset ID Column Header ####                     <a id="06.03.11"></a>

The Asset ID Column Header setting is for the header which appears in all files,
for the column containing the data for the Asset IDs related to the meter
readings. The header name must be the same across all files in the "data"
folder, or else the program will throw an error and wait until the file is
altered before proceeding. The configuration file can also be altered to
compensate, but any changes made to the configuration file requires the program
to be closed and reopened to take affect.

Asset ID is different from Asset Code. To view the ID of assets, take the
following steps:

1. Log into the CMMS (if not already logged in).
2. Select Assets from the menu on the left.
3. Click on the "Set Visible Columns" button.
  * On a desktop, the button is a small image of a list made of squares and
    rectangles, located to the far right of the page, above the list of assets.
4. Check the box labelled "id".
5. Click the "OK" button.
6. The ID value of the assets should appear as a new column in the list.

If the Meter Reading Only setting (4) is toggled on, or the Set Default ID
setting (7) is not empty, then the Asset ID Column Header setting will be
ignored, under the assumption that there are no headers in the files, and only
one column or string of data for meter readings, or the assumption that the
configured default is the correct value.


#### 12: Meter Reading Value Column Header ####          <a id="06.03.12"></a>

Similar to the Asset ID Column Header setting (10), the Meter Reading Value
Column Header setting is for the header which appears in all files, for the
column containing the data for the meter reading data. The meter readings should
be purely numerical, with the unit separated and in a different column.

If the Meter Reading Only setting (4) is toggled on, then the Meter Reading
Value Column Header setting will be ignored, under the assumption that there are
no headers in the files, and only one column or string of data for meter
readings.


#### 13: Meter Reading Value Unit Measurement Column Header ####<a id="06.03.13"></a>

Similar to the Asset ID Column Header setting (10), the Meter Reading Value
Unit Measurement Column Header setting is for the header which appears in all
files, for the column containing the data for the unit of the meter reading
data.

If the Meter Reading Only setting (4) is toggled on, or the Set Default Unit
setting (8) is not empty, then the Meter Reading Value Unit Measurement
Column Header setting will be ignored, under the assumption that there are no
headers in the files, and only one column or string of data for meter readings,
or the assumption that the configured default is the correct value.


#### 14: Date Column Header ####                         <a id="06.03.14"></a>

Similar to the Asset ID Column Header setting (10), the Date Column Header
setting is for the header which appears in all files, for the column containing
the dates that the meter reading data was taken at.

For best results, the date data in the CSV files should be using RFC2822 format
or ISO 8601 Date format. Any other format may result in unexpected values, and
therefore should be avoided.

&nbsp;&nbsp;&nbsp;For RFC2822 Format, see [http://tools.ietf.org/html/rfc2822#page-14][RFC]  
&nbsp;&nbsp;&nbsp;For ISO 8601 Format, see [http://www.w3.org/TR/NOTE-datetime-970915.html][ISO]

If the Meter Reading Only setting (4) is toggled on, or the Automatic Date
Reading setting (6) is toggled on, then the Date Column Header setting will
be ignored, under the assumption that there are no headers in the files, and only
one column or string of data for meter readings, or the assumption that the
configured default is the correct value.

[RFC]: http://tools.ietf.org/html/rfc2822#page-14
[ISO]: http://www.w3.org/TR/NOTE-datetime-970915.html  


#### 15: Work Order ID Column Header ####                <a id="06.03.15"></a>

Similar to the Asset ID Column Header setting (10), the Work Order ID Column
Header setting

If the Meter Reading Only setting (4) is toggled on, then the Work Order ID
Column Header setting will be ignored, under the assumption that there are no
headers in the files, and only one column or string of data for meter readings.


### 6.4  BATCH SETUP ###                                 <a id="06.04.00"></a>

The batch setup has two requirements:

&nbsp;&nbsp;&nbsp;16: [Maximum Batch Requests Per Minute](#06.04.16)                  - \[REQUIRED]  
&nbsp;&nbsp;&nbsp;17: [Time Delay Between Files](#06.04.17)                           - \[REQUIRED]


#### 16: Maximum Batch Requests Per Minute ####          <a id="06.04.16"></a>

The maximum batch requests per minute value
keeps the server from throttling the program, and varies depending on the size
of the company using the CMMS. If the program repeatedly fails to send batch
requests, and there is a stable internet connection, it is because the maximum
batch requests per minute is set too high. Each batch request is a single meter
reading, so an MBR/min of 200 means that the program will attempt to send up to
two hundred meter readings from the CSV file currently being read to the CMMS.
Due to the nature of the program, all two hundred will be sent at once, and then
a minute delay will begin after the server responds, to prevent throttling.


#### 17: Time Delay Between Files ####                   <a id="06.04.17"></a>

The time delay between files is meant to force the program to wait before moving
to the next file, or continuing the current file if closed or failed before
finishing previously, so that a user is capable of making any changes to the CSV
files in the "data" folder, altering unit data in the CMMS, or adding more files
for the program to read, before the next check. It also gives time for any
internet instability to resolve before re attempting to send files to the CMMS.
The value is in minutes, and the default setting is half an hour.


### 6.5  RESET ###                                       <a id="06.05.00"></a>

The reset setup has one requirement:

&nbsp;&nbsp;&nbsp;18: Reset The File And Position Tracking               - \[REQUIRED] \[TOGGLE]

The reset option, which is either 0 or 1, is meant for resetting the position of
the program's tracking. The program automatically saves how many files it has
read, and how much of the current file it has sent to the CMMS. Changing the
value to from 0 to 1 will cause the next time the program is opened to reset the
position, and leaving the option at 1 will cause the position to reset every
time the program is opened until the value is changed back to 0.

If the tracking is reset, but the files in the "data" folder have not changed,
the program will begin at the first file and begin sending all of the data that
has already been read. This will create duplicates of data on the CMMS, which
should be avoided. Position tracking should only be reset if the files in the
"data" folder are being removed from the folder and new files beginning at "1"
are being placed in the "data" folder.

<br>


7  RUNNING                                               <a id="07.00.00"></a>
----------

Once the configuration file is prepared, open the file "Runnable.html" using the
Brackets text editor. Then, use the "Live Preview" function, which can be found
in the File menu. The program will begin running, and if everything is prepared
properly with a stable internet connection, the program will start sending the
meter reading data from the CSV files to the CMMS.

<br>


8  TROUBLESHOOTING                                       <a id="08.00.00"></a>
------------------

Most errors are reported to the user through the use of "STATUS: &#60;message\>". Any
server related error can be due to either throttling or rejection from the
server, which is most likely an issue with the maximum batch requests per minute
(see section 6.4), an unstable internet connection, or a lack
of an internet connection.

Any error which has the status details of "Ending Program." is a fatal error.
Fatal errors require the program to be restarted. Documented fatal errors can
only occur before the program begins its endless runtime loop. All other issues
merely cause the program to delay itself and re attempt at a later time.

The following are any of the possible documented errors:

1. "Failed to begin program."
  * Issue with the JavaScript. The issue is most likely an error with server
    hosting. Brackets generates a local server to run the program from,
    allowing for calls to local files to be made. If the program is run
    outside of Brackets' "Live Preview" function, it will not work. Changing
    this requires altering the javascript to looking for "localhost:&#60;port\>",
    with the localhost being the directory of the program, and then running a
    server such as SimpleHTTPServer from the directory to make the program
    run.

2. "Failed to fetch config.txt file."
  * Fatal error.
  * There was an issue with the config.txt, or in reaching it.
  * If there were no status details, check to make sure that there is a folder
    named "config" in the same directory as the "Runnable.html" and within the
    "config" folder, there is a file named "config.txt". Otherwise, there may
    have been an unexpected issue with fetching the file.

3. "Unable to proceed. CMMS could not be called."
  * Fatal error.
  * Either the API is configured incorrectly, the internet connection at the
    time of starting the program was unstable, or there is no internet
    connection.
  * After re attempting to start the program with a stable internet connection,
    check the config.txt to make sure the API is set up properly. The API
    could be paused in the CMMS. In which case, see "API CONNECTING" below.

4. "Attempt to fetch the unit information from the server was unsuccessful."
  * The server could not be reached. Check the internet connection to make
    sure it is stable, and try again. Make sure there is unit data in the CMMS
    for the program to find.

5. "Failed to find the CSV file &#60;filename\>."
  * The mentioned file the program is attempting to find does not exist, or
    there was an unexpected issue with fetching the file.

6. "Failed to obtain or format the CSV file data."
  * If there are no status details, there was an unexpected issue with
    fetching the file.
  * If the status details say the unit data is not registered in the
    database, either there was a spelling mistake, or the unit data needs to
    be registered in the CMMS. See "ADDING UNITS" below.

Any other errors which occur without a status message are unknown.


### 8.1  API CONNECTING ###                              <a id="08.01.00"></a>

From a desktop view of the CMMS:

1. Log into the CMMS (if not already logged in).
2. Select "Settings" from the menu on the left.
3. Choose "Api Application Settings" from the options within "Settings".
4. Select the application your automated meter reading file handler is
   connected to.
5. If the switch beside the "Name of Api Application" box says "Inactive",
   click it to allow the program to connect to the CMMS through the API.
6. Check to make sure the program is set to "System Facing Integration" in the
   general settings. Change the setting if it is not.
7. Click save at the top of the screen.


### 8.2  ADDING UNITS ###                                <a id="08.02.00"></a>
  
From a desktop view of the CMMS:

1. Log into the CMMS (if not already logged in).
2. Select "Assets" from the menu on the left.
3. Select any asset.
4. Switch to the tab labelled "Metering/Events".
5. Click the page with a plus sign in the bottom left corner of the meter
   readings to make a new meter reading.
6. Click the downward facing arrow beside the units to view all units.
7. Click the "New" button.
8. Create a new unit.
9. Click the small "x" at the top of the pop-up boxes to close the meter
   reading without making a new one.

<br>


9  LICENSING                                             <a id="09.00.00"></a>
------------

Maintenance Assistant Labs Automated Meter Reading File Handler uses the bundled
package of the Maintenance Assistant CMMS client for JavaScript which is
available under the Apache License 2.0. For more information, see the files:

&nbsp;&nbsp;&nbsp;LICENSE.txt  
&nbsp;&nbsp;&nbsp;NOTICE.txt  

Brackets is licensed under the MIT License. For more information, visit the
web page:

&nbsp;&nbsp;&nbsp;[https://github.com/adobe/brackets/blob/master/LICENSE][BrL]

Python is a trademark or registered trademark of the Python Software Foundation.
Python, its standard libraries, and Jython, are distributed under the Python
License. For more information, visit the web pages:

&nbsp;&nbsp;&nbsp;[https://www.python.org/psf/][Py]  
&nbsp;&nbsp;&nbsp;[https://docs.python.org/2/license.html][PyL]  

Copyright (c) 2015 The JQuery Foundation.
JQuery is licensed under the MIT license. For more information, visit the
web page:

&nbsp;&nbsp;&nbsp;[https://tldrlegal.com/license/mit-license][JQL]

[BrL]: https://github.com/adobe/brackets/blob/master/LICENSE
[Py]:  https://www.python.org/psf/
[PyL]: https://docs.python.org/2/license.html
[JQL]: https://tldrlegal.com/license/mit-license

<br>


10 ALTERNATIVE                                           <a id="10.00.00"></a>
--------------

Running the program without Brackets requires generating a server. A simple
solution is to generate a simple server to run localhost. Below is an example
solution using Python's SimpleHTTPServer module.


### 10.1 SIMPLEHTTPSERVER ###                            <a id="10.01.00"></a>

SimpleHTTPServer is a part of Python, and thus can be called easily from such.
This example uses Python 2.7.9, which can be downloaded from the following link:

&nbsp;&nbsp;&nbsp;[https://www.python.org/ftp/python/2.7.9/python-2.7.9.msi][Py2]

When the installer prompts the user to "Customize Python 2.7.9", be sure to
check the "Add python.exe to Path" option. It must be set to "Entire feature
will be installed on local hard drive" to use the specific commands listed in
this README. If you do not want to add python to the system Path variable,
replace all instances of "python" with the path of your python.exe file.

Open the command line (command prompt in Windows, bash in Mac & Linux), and
locate the directory containing the "Runnable.html" file. If you saved the
"Automated Meter Reading Handler" to your desktop, and are running a windows
operating system, then the command line entry may look similar to this:

    cd C:\Users\Bob\Desktop\Automated Meter Reading Handler

Once in the "Automated Meter Reading Handler" folder, enter the following:

    python -m SimpleHTTPServer

If the SimpleHTTPServer successfully runs, then in a browser type into the
address bar:

    localhost:8000

A directory of the folder will be shown. clicking on the "Runnable.html" link
will begin the program.

For more information, visit the web page:

&nbsp;&nbsp;&nbsp;[http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/][PyB]

[Py2]: https://www.python.org/ftp/python/2.7.9/python-2.7.9.msi
[PyB]: http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/

<br>


11 EXAMPLES                                              <a id="11.00.00"></a>
-----------

All examples for the program are located in the "examples" folder. The example
configuration file is titled "EXconfig.txt", and uses settings appropriate for
the "1data.csv" file in the "EXdata" folder.

The "EXdata" folder contains seven different files. Each file is an example for
the different optional settings. For more information on the specifics of each
file, see below.

It is **highly recommended** that the example files are opened using Notepad (if
using Windows), or an equivalent basic text editing program. Viewing the files
in a spreadsheet application, such as Microsoft Excel, can result in unexpected
issues with the viewing of the data and formatting of the examples.


### 11.1 1data.csv ###                                   <a id="11.01.00"></a>

The ["1data.csv"][ex1] file is a basic CSV file of meter readings. It only contains the
needed headers for the program to run with a generic configuration. If the file
had more columns with various headers, it wouldn't make a difference, since all
the program needs are the four columns shown in the "1data.csv" file.

The header names are configurable (see section 6.3).

[ex1]: examples/EXdata/1data.csv


### 11.2 2data.csv ###                                   <a id="11.02.00"></a>

The ["2data.csv"][ex2] file is an example file using the optional toggle setting "4:
Meter Reading Only" (see section 6.2). It is assumed for this file that setting
4 is turned on, and settings 7, 8, and 9 are in use.

[ex2]: examples/EXdata/2data.csv


### 11.3 3data.csv ###                                   <a id="11.03.00"></a>

The ["3data.csv"][ex3] file is an example file using the optional setting "5:
Delimiter" (see section 6.2). It is assumed for this file that setting 5 has
been set to "^", and no other optional settings are in use.

[ex3]: examples/EXdata/3data.csv


### 11.4 4data.csv ###                                   <a id="11.04.00"></a>

The ["4data.csv"][ex4] file is an example file using the optional toggle setting "6:
Quotation Wrapped Data" (see section 6.2). It is assumed for this file that
setting 6 is turned on, and no other optional settings are in use.

[ex4]: examples/EXdata/4data.csv


### 11.5 5data.csv ###                                   <a id="11.05.00"></a>

The ["5data.csv"][ex5] file is an example file using the optional toggle setting "7:
Automatic Date Reading" (see section 6.2). It is assumed for this file that
setting 7 is turned on, and no other optional settings are in use.

[ex5]: examples/EXdata/5data.csv


### 11.6 6data.csv ###                                   <a id="11.06.00"></a>

The ["6data.csv"][ex6] file is an example file using the optional setting "8: Set
Default ID" (see section 6.2). It is assumed for this file that setting 8 has a
valid asset ID entered, and no other optional settings are in use.

[ex6]: examples/EXdata/6data.csv


### 11.7 7data.csv ###                                   <a id="11.07.00"></a>

The ["7data.csv"][ex7] file is an example file using the optional setting "9: Set
Default Unit" (see section 6.2). It is assumed for this file that setting 9 has
a valid unit (registered in the CMMS) entered, and no other optional settings
are in use.

[ex7]: examples/EXdata/7data.csv


### 11.8 8data.csv ###                                   <a id="11.08.00"></a>

The ["8data.csv"][ex8] file is an example file using the optional setting "14: Work
Order ID Column Header" (see section 6.3). It is assumed for this file that
setting 14 has a valid header name entered, and no other optional settings are
in use.

[ex8]: examples/EXdata/8data.csv

<br>


12 CHANGELOG                                             <a id="12.00.00"></a>
------------

#### v1.4.1 ####

* Corrected the fileList position to be identical to the actual position
* Minor change in internal documentation
  * Corrected the stringFormat at-a-glance explanation
* Began file hosting on GitHub


#### v1.4.0 ####

* Changed the "Splitter" setting to "Delimiter" setting  
* Made "Delimiter" setting usable without the "Meter Reading Only" setting  
* Added a configuration setting for quote surrounded data  
  * "Quotation Wrapped Data" setting  
* Minor bug fixes  
* Updated the "README.txt" and "Step-By-Step Beginner Guide.txt" files  
* Updated the example files  
* Added information to the top of the code  
  * For easier updating/version control  


#### v1.3.0 ####

* Improved the UI  
* Decluttered the config.txt  
* Replaced the README.txt with a README.md  
* Created a "Step-By-Step Beginner Guide.txt" file  
* Created and populated an examples folder  
* Minor bug fixes  
* Updated the "README.txt" file


#### v1.2.0 ####

* Added the Format Setup section to the "config.txt" file  
* Created a "README.txt" file  
* Minor bug fixes  


#### v1.1.0 ####

* Added a "config.txt" file  
* Bug fixes  