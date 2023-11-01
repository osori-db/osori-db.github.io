# Guide

## User Guide

### Description about "Restriction" name and "Traffic Light" (Restriction in use)
Restriction indicates any usage restrictions about an Open Source Software (OSS) or its license in your usage. There may be multiple restrictions in a single OSS or license.

| **Restriction Name** | **Description** | **LEVEL** | **Traffic Light<br>(Restriction in use)** |
| --- | --- | --- | --- |
| Non-Commercial Use | Not allowed for commercial use<br> Cannot use the complimentary software from the publishing corp.| 5 | Red |
| Internal Use Only | Allowed only for internal use in your organization | 4 | Red |
| No Charge | Prohibit its own sale or does not request cost payment in its direct usage<br>(Possible to use in a complimentary software provided from a corp.) | 3 | Yellow |
| No Modification | Prohibits modification | 2 | Yellow |
| No Change the Name | Prohibits changing the name | 1 | Green |
| Platform Limitation | Can be used only on specific platforms | 2 | Yellow |
| Purpose Restriction | Restricts use for a specific purpose | 2 | Yellow |
| Specification Restriction | Restricts use related to specific specifications or standards | 2 | Yellow |
| Redistribution Restriction | Restricts subcomponents of software that can be redistributed<br> (source code, binary files, etc.) | 2 | Yellow |
| Contract Required | Require a separate contract | 5 | Red |
| Provide Installation Information Required | Has a duty to provide its installation information | 4 | Red |
| Patent Warning | Possibility under a patent dispution | 4 | Red |
| Network Triggered | Must comply the obligations even using as a network server<br> ex. AGPL-3.0 | 3 | Yellow |
| Semi-Copyleft | Restrictions can be nullified by disclosing the code<br>even though there are various kinds of requirements<br>according to Copyright holder's requests and a type of distribution. | 3 | Yellow |

- Level: Indicates severity between 1 to 5, according to a degree of attention needed in your commercial usage.
- Traffic Light (Restriction in use): Straightforward display in red, yellow, or green colors according to Level.
  - 1: Green
  - 2-3: Yellow
  - 4-5: Red

### Definition of entities in "License" data table
- Name: Name of the given License (full name if it's SPDX License)
- nicknameList: List of alternative names indicating the given License
- spdx_identifier: Identifier from https://spdx.org/licenses/
- license_text: Original text of the given License
- osi_approval: Whether the License has been approved by OSI (https://opensource.org/licenses/)
- description: Description about the given License (in English)
- description_ko: Description about the given License (in Korean)
- obligation_disclosing_src: Scope of source code disclosure in its distribution

| **Category** | **Scope of disclosure and its example** |
| --- | --- |
| NONE | No obligation to disclose |
| ORIGINAL | Original open source |
| FILE | Source code in a unit of file |
| MODULE | Source code in a unit of module |
| LIBRARY | Source code in a unit of library |
| DERIVATIVE WORK | A scope of derivative works legally |
| EXECUTABLE | Source code in a composition of executable file |
| DATA | Data itself |
| SOFTWARE USING THIS | All the other software that use the given open source |
| UNSPECIFIED | Disclosure is required, but its scope is unclear |

- obligation_notification: Obligation of notification in distribution
  - false: Obligation of notification is not existed.
  - true: Obligation of notification is existed.
- webpage: Representative web link for the given License
- webpageList: Additional web links aside from "webpage" above for the given License
- restrictionList: Constraints condition

### Definition of entities in "OSS" data table
- name: Name of the given OSS
  - It is the same as in purl (https://github.com/package-url/purl-spec).
- **`nicknameList`**: List of alternative names indicating the given OSS
- homepage: Homepage of the given OSS
- download_location: Representative link to download the given OSS
- purl: Package URL (purl) representing the representative link to the given OSS (https://github.com/package-url/purl-spec)
- **`downloadLocationList`**: Additional links to download the given OSS
- **`purlList`** : List of Package URLs corresponding to downloadLocationList
- description: Summary description of the given OSS
- compliance_notice: Summary description of the given OSS in terms of compliance in English<br>(Additional info. regarding compliance which is not described in Restriction)
- compliance_notice_ko: Summary description of the given OSS in terms of compliance in Korean<br>(Additional info. regarding compliance which is not described in Restriction)
- **`version_license_diff`**: True if its license is different according to the release version.
- **`attribution`**: Matters requiring separate notification
- **`publisher`**: Distributor or owner (personel or organization)
- **`oss_version`: Information per a version of the given OSS**
  - version: Version number
  - description: Summary explanation per version (in English)
  - description_ko: Summary explanation per version (in Korean)
  - license_combination: Logical relationship of dual or multiple licenses indicated in declaredLicenseList (possible values: AND, OR, null)
  - `declaredLicenseList`: Representative license of the given OSS
  - `detectedLicenseList`: Additional licenses detected aside from declaredLicense in the given OSS
  - `restrictionList`: Constraints
  - release_date: Release date
