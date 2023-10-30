# User API Guide

This section explains how to use the APIs provided by the OSORI project for users.

---

{:.warning }
> **Limitations on the API usage**: these user APIs are restricted to use under the condition below.<br>
**If more than 5,000 API are called in an hour, we block its usage due to Too Many Request exception.**

## OSORI User API Base URL
OSORI User API v1.0 (Swagger UI): [Link](http://223.255.204.223:8082)

## Inquiry for the license list

### `/api/v1/licenses`

{:.note }
**This is an API that can retrieve data about the license provided from the OSORI project.**

#### Query parameters in the API

| Parameter name | Detail description |
| --- | --- |
| name | License name <br> ex. MIT License |
| spdxIdentifier | SPDX license identifier <br> ex. MIT |
| webpage | A URL address for the license notice<br> ex. https://opensource.org/licenses/MIT |
| equalFlag | Configuration for specifying the search results based on the given keyword.<br> - 'Y': Displays the results that exactly match the keyword <br> - 'N' (default value): Displays all the results that have the keyword |
| modifiedDate | Date of modification |
| page | The number of start page (mandatory value) <br> - Default value: 0 |
| size | The number of retrieved data from the page (mandatory value) |
| sort | Sorting criteria in terms of data entity (mandatory value).<br>The available entities for the criteria are listed as follows. <br> - name <br> - nickname <br> - id <br> - version <br> - oss_version_id |
| direction | Sorting order <br> - ASC: Ascending (default value) <br> - DESC: Descending |

#### Usage example
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)**`/api/v1/licenses?name=MIT%20License&equalFlag=Y&page=0&size=1&sort=name&direction=ASC`**

#### Header in response
Content-Type application/json

#### Body in response (JSON)
```json
{
    "code": "200",
    "messageList": {
        "list": [
            {
                "id": 24,
                "name": "MIT License",
                "obligation_disclosing_src": "NONE",
                "obligation_notification": true,
                "osi_approval": false
            }
        ],
        "count": 1
    },
    "success": true
}
```

#### Details in the response body

| **Name** | **Description** |
| --- | --- |
| code | Code value representing a response status of the API<br> 200: Success |
| id | ID of the target retrieved data (primary key) |
| name | License name |
| obligation_disclosing_src | Scope of source code disclosure in distribution <br> - NONE <br> - ORIGINAL <br> - FILE <br> - MODULE <br> - LIBRARY <br> - DERIVATIVE WORK <br> - EXECUTABLE <br> - DATA <br> - SOFTWARE USING THIS <br>- UNSPECIFIED |
| obligation_notification | Whether or not the obligation of notification exists in distribution <br> - false: No obligation <br> - true: Obligates notification in its distribution |
| osi_approval | Whether or not the license has been approved by OSI (https://opensource.org/licenses/) |
| count | Total number of the retrieved data |
| success | Result of the API call<br> - false: Failure <br> - true: Success |

## Inquiry for detail information of the license

### `/api/v1/licenses/{category}?searchWord={search keyword}`

{:.note }
**This is an API that allows you to retrieve detail information about the license provided from the OSORI project.**

#### Query parameters in the API

| Parameter name | Detail description |
| --- | --- |
| category | Select the data entity for your search<br> - name<br> - spdx_identifier<br> - url |
| searchWord | Enter the keyword for your search<br> ex. MIT |

#### Usage example
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)/api/v1/licenses/spdx_identifier?searchWord=MIT 

#### Header in response
Content-Type application/json

#### Body in response (JSON)
```json
{
  "code": "200",
  "messageList": {
    "detailInfo": [
      {
        "id": 63,
        "name": "MIT License",
        "obligation_disclosing_src": "NONE",
        "obligation_notification": true,
        "spdx_identifier": "MIT",
        "webpage": null,
        "description": "To distribute the software, copyright and license notice is required.\n\n",
        "description_ko": null,
        "license_text": "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
        "osi_approval": false,
        "modifier": "soim",
        "created_date": "2023-10-16 10:08:58",
        "modified_date": "2023-10-17 21:51:33",
        "reviewed": true,
        "nicknameList": [
          "Bouncy Castle Licence",
          "The MIT License",
          "The MIT License (MIT)"
        ],
        "webpageList": [
          "https://spdx.org/licenses/MIT.html"
        ],
        "restrictionList": null
      }
    ]
  },
  "success": true
}
```

#### Details in the response body

| **Name** | **Description** |
| --- | --- |
| code | Code value representing a response status of the API<br> 200: success |
| id | ID of the target retrieved data (primary key) |
| name | License name |
| obligation_disclosing_src | Scope of source code disclosure in distribution<br> - NONE<br> - ORIGINAL<br> - FILE<br> - MODULE<br> - LIBRARY<br> - DERIVATIVE WORK<br> - EXECUTABLE<br> - DATA<br> - SOFTWARE USING THIS<br> - UNSPECIFIED |
| obligation_notification | Whether or not the obligation of notification exists in distribution <br> - false : no notification obligation<br> - true : notification obligation exists |
| spdx_idetifier | A name of SPDX identifier |
| webpage | A URL address for the license notice |
| description | Description of the license |
| license_text | License notice text |
| osi_approval | Whether or not the license has been approved by OSI (https://opensource.org/licenses/) |
| reviewed | Review status of the license (from the OSORI Steering Committee)<br> - false: not reviewed<br> - true: review completed |
| nicknameList | List of nicknames for the license |
| webpageList | List of alternative URLs aside from webpage, such as sources of license notices |
| restrictionList | List of restrictions imposed by the license |

## Inquiry for the Open Source software (OSS) List

### `/api/v1/oss`

{:.note }
**This is an API that allows you to retrieve open source information provided from the OSORI project.**

#### Query parameters in the API

| Parameter name | Detail description | 
| --- | --- |
| ossName | Open Source name |
| version | Open Source version information |
| downloadLocation | A URL for downloading the given Open Source<br> ex. github/aerogear-attic/aerogear-android-stor |
| equalFlag | Configuration for specifying the search results based on the given keyword.<br> - 'Y': Displays the results that exactly match the keyword <br> - 'N' (default value): Displays all the results that have the keyword |
| modifiedDate | Date of modification |
| page | The number of start page (mandatory value) <br> - Default value: 0 |
| size | The number of retrieved data from the page (mandatory value) |
| sort | Sorting criteria in terms of data entity (mandatory value) <br> The available entities for the criteria are as follows. <br> - name <br> - nickname <br> - id <br> - version <br> - oss_version_id |
| direction | Sorting order <br> - ASC: Ascending (default value) <br> - DESC: Descending |

#### Usage example
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)**`/api/v1/oss?ossName=android&equalFlag=Y&page=0&size=10&sort=name&direction=ASC`**

#### Header in response
Content-Type application/json

#### Body in response (JSON)
```json
{
    "code": "200",
    "messageList": {
        "list": [
            {
                "oss_master_id": 8681,
                "name": "aerogear-android-store",
                "version": [
                    {
                        "version": "4.0.0",
                        "version_id": "8259",
                        "declaredLicense": null
                    }
                ],
                "version_license_diff": "false",
                "purl": "pkg:github/aerogear-attic/aerogear-android-store"
            }
        ],
        "count": 1
    },
    "success": true
}
```

#### Details in the response body

| **Name** | **Description** |
| --- | --- |
| code | Code value representing a response status of the API<br> 200: Success |
| oss_master_id | ID of the target retrieved Open Source data (primary key) |
| name | Open source name |
| version_id | ID of the version for the given Open Source (primary key) |
| version | Open Source version information |
| declaredLicense | Representative license defined in the given Open Source version |
| detectedLicense | Additional licenses detected aside from declaredLicense in the given Open Source version |
| version_license_diff | True if its license is different according to the release version. |
| purl | Package URL (purl) of the representative link to the given Open Source (https://github.com/package-url/purl-spec) |
| count | Total number of the retrieved data |
| success | Result of the API call <br> - false: Failure <br> - true: Success |

## Inquiry for detail information of the Open Source

### `/api/v1/oss/{category}/versions?searchWord={search keyword}`

{:.note }
**This is an API that allows you to retrieve detail information about the Open Source provided from the OSORI project.**

#### Query parameters in the API

| Parameter name | Detail description | 
|---|---|
| category | Select the data entity for your search<br> - name<br> - download_location |
| searchWord | Enter the keyword for your search<br> ex. facebook |

#### Usage example
curl --location --request GET 'https://{osori_base_url}/api/v1/oss/name/versions?searchWord=facebook'

#### Header in response
Content-Type application/json

#### Body in response (JSON)
```json
{
  "code": "200",
  "messageList": {
    "detailInfo": {
      "oss_master": [
        {
          "oss_master_id": 5901,
          "name": "facebook",
          "download_location": "https://github.com/huandu/facebook",
          "purl": "pkg:github/huandu/facebook",
          "homepage": null,
          "description": null,
          "compliance_notice": null,
          "compliance_notice_ko": null,
          "version_license_diff": false,
          "attribution": null,
          "publisher": null,
          "downloadLocationList": [],
          "purlList": [],
          "nicknameList": [
            "huandu/facebook"
          ],
          "modifier": "sean.gold",
          "modified_date": "2023-10-20 17:08:26",
          "created_date": "2023-10-20 17:08:25",
          "oss_version": [
            {
              "oss_version_id": 14740,
              "version": "2.3.1+incompatible",
              "description": null,
              "description_ko": null,
              "attribution": null,
              "license_combination": null,
              "release_date": null,
              "modifier": "sean.gold",
              "declaredLicenseList": [
                "MIT License"
              ],
              "detectedLicenseList": null,
              "restrictionList": null,
              "created_date": "2023-10-20 17:08:26",
              "modified_date": "2023-10-20 17:08:26"
            }
          ]
        }
      ]
    }
  },
  "success": true
}
```

#### Details in the response body

| **Name** | **Description** |
| --- | --- |
| code | Code value representing a response status of the API<br> 200: Success |
| oss_master_id | ID of the target retrieved Open Source data (primary key) |
| name | Open source name |
| download_location | A download URL for the given Open Source |
| purl | Package URL (purl) of the representative link to the given Open Source (https://github.com/package-url/purl-spec) |
| homepage | A URL of the official Open Source website |
| description | Description of the Open Source |
| compliance_notice | Summary description of the given Open Source in terms of compliance (value exists only when it has the compliance notice) |
| version_license_diff | True if its license is different according to the release version. |
| attribution | Matters requiring separate notification |
| publisher | Distributor or owner (personel or organization) |
| downloadLocationList | Additional links to download the given Open Source<br> ex. http://github.com |
| nicknameList | List of alternative names indicating the given Open Source |
| oss_version | A version list of the given Open Source |
| oss_version_id | ID of the given Open Source version (primary key) |
| version | Version information of the given Open Source (version name) |
| description | Summary description of the given Open Source version (in English) |
| attribution | Matters requiring separate notification |
| license_combination | Logical relationship of dual or multiple licenses indicated in declaredLicenseList (possible values: AND, OR, null) |
| declaredLicense | Representative license defined in the given Open Source version |
| detectedLicense | Additional licenses detected aside from declaredLicense in the given Open Source version |
| restrictionList | List of restrictions imposed by the given Open Source |
