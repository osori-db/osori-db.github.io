# 사용자 API 가이드

오소리 프로젝트가 사용자에게 제공하는 API 사용법에 대해서 설명합니다.

---

{: .warning }
> **API 사용 제한**: 오소리 사용자 API는 다음과 같은 사용제한이 걸려 있습니다.<br>
**한시간당 최대 5,000번 이상의 API 호출이 시도되면, Too Many Request 예외가 발생합니다.**

## 사용자 API URL 주소
오소리 사용자 API v1.0 (Swagger UI): [링크](http://223.255.204.223:8082)

## 라이선스 목록 조회

### `/api/v1/licenses`

{: .note }
**오소리에 등록되어 있는 라이선스 정보를 조회할 수 있는 API 입니다.**

#### Query 매개변수 정보

| 매개변수 이름 | 세부 설명 | 
| --- | --- |
| name | 라이선스 이름 <br> 예) MIT License |
| spdxIdentifier | spdx 라이선스 identifier <br> 예) MIT |
| webpage | 라이선스 고지문 URL 주소 <br> 예) https://opensource.org/licenses/MIT |
| equalFlag | 검색결과 대상을 지정할 때 사용합니다. <br> - 'Y': 검색어가 정확히 일치하는 검색 결과 표시 <br> - 'N'(기본값): 검색어가 포함된 모든 검색 결과 표시  |
| modifiedDate | 수정일 |
| page | 시작 page 숫자(필수값) <br> - 기본값: 0 |
| size | page에서 가져올 데이터 개수(필수값) |
| sort | 정렬 기준 항목(필수값) <br> 정렬 기준에 사용할 수 있는 항목은 아래와 같습니다. <br> - name <br> - nickname <br> - id <br> - version <br> - oss_version_id |
| direction | 정렬 방향 <br> - ASC: 오름차순 (기본값) <br> - DESC: 내림차순 |

#### 사용 예제
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)**`/api/v1/licenses?name=MIT%20License&equalFlag=Y&page=0&size=1&sort=name&direction=ASC`**

#### 응답 Header
Content-Type application/json

#### 응답 Body
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

#### 응답 항목 의미

| **이름** | **의미** |
| --- | --- |
| code | API 응답 상태값 <br> 200: 성공 |
| id | 조회 대상의 ID (primary Key) |
| name | 라이선스 이름 |
| obligation_disclosing_src | 배포시 소스 코드 공개 범위 <br> - NONE <br> - ORIGINAL <br> - FILE <br> - MODULE <br> - LIBRARY <br> - DERIVATIVE WORK <br> - EXECUTABLE <br> - DATA <br> - SOFTWARE USING THIS <br>- UNSPECIFIED |
| obligation_notification | 배포시 고지 의무 <br> - false : 고지 의무 없음 <br> - true : 고지 의무 있음 |
| osi_approval | OSI에서 승인한 라이선스인지 여부 (https://opensource.org/licenses/) |
| count | 조회된 항목 전체 개수 |
| success | API 동작 결과 <br> - false : 실패 <br> - true : 성공 |

## 라이선스 상세 정보 조회

### `/api/v1/licenses/{category}?searchWord={search keyword}`

{: .note }
**오소리에 등록되어 있는 라이선스 상세 정보를 조회할 수 있는 API 입니다.**

#### Query 매개변수 정보

| 매개변수 이름 | 세부 설명 | 
| --- | --- |
| category | 검색에 사용할 항목을 선택<br> - name<br> - spdx_identifier<br> - url |
| searchWord | 검색에 사용할 단어를 입력합니다.<br> 예) MIT |

#### 사용 예제
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)/api/v1/licenses/spdx_identifier?searchWord=MIT 

#### 응답 Header
Content-Type application/json

#### 응답 Body
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

#### 응답 항목 의미

| **이름** | **의미** |
| --- | --- |
| code | API 응답 상태값<br> 200: 성공 |
| id | 조회 대상의 ID (primary Key) |
| name | 라이선스 이름 |
| obligation_disclosing_src | 배포시 소스 코드 공개 범위<br> - NONE<br> - ORIGINAL<br> - FILE<br> - MODULE<br> - LIBRARY<br> - DERIVATIVE WORK<br> - EXECUTABLE<br> - DATA<br> - SOFTWARE USING THIS<br> - UNSPECIFIED |
| obligation_notification | 배포시 고지 의무<br> - false : 고지 의무 없음<br> - true : 고지 의무 있음 |
| spdx_idetifier | spdx identifier 이름 |
| webpage | 라이선스 url |
| description | 라이선스에 대한 설명 |
| license_text | 라이선스 고지문 |
| osi_approval | OSI에서 승인한 라이선스인지 여부 (https://opensource.org/licenses/) |
| reviewed | 오소리 운영 위원회로부터의 라이선스 리뷰 여부<br> - false : 리뷰 안됨<br> - true : 리뷰 완료 |
| nicknameList | 라이선스의 별명 목록 |
| webpageList | 라이선스 고지문 출처 등 url 목록 |
| restrictionList | 라이선스가 가지고 있는 제약사항 목록 |

## 오픈소스 목록 조회

### `/api/v1/oss`

{: .note }
**오소리에 등록되어 있는 오픈소스 정보를 조회할 수 있는 API 입니다.**

#### Query 매개변수 정보

| 매개변수 이름 | 세부 설명 | 
| --- | --- |
| ossName | 오픈소스 이름 |
| version | 오픈소스 버전 정보 |
| downloadLocation | 오픈소스 다운로드 URL 주소 <br> 예) github/aerogear-attic/aerogear-android-stor |
| equalFlag | 검색결과 대상을 지정할 때 사용합니다. <br> - 'Y': 검색어가 정확히 일치하는 검색 결과 표시 <br> - 'N'(기본값): 검색어가 포함된 모든 검색 결과 표시  |
| modifiedDate | 수정일 |
| page | 시작 page 숫자(필수값) <br> - 기본값: 0 |
| size | page에서 가져올 데이터 개수(필수값) |
| sort | 정렬 기준 항목(필수값) <br> 정렬 기준에 사용할 수 있는 항목은 아래와 같습니다. <br> - name <br> - nickname <br> - id <br> - version <br> - oss_version_id |
| direction | 정렬 방향 <br> - ASC: 오름차순 (기본값) <br> - DESC: 내림차순 |

#### 사용 예제
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)**`/api/v1/oss?ossName=android&equalFlag=Y&page=0&size=10&sort=name&direction=ASC`**

#### 응답 Header
Content-Type application/json

#### 응답 Body
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

#### 응답 항목 의미

| **이름** | **의미** |
| --- | --- |
| code | API 응답 상태값 <br> 200: 성공 |
| oss_master_id | 오픈소스 ID (primary Key) |
| name | 오픈소스 이름 |
| version_id | 오픈소스 버전 ID (primary key) |
| version | 오픈소스 버전 정보 |
| declaredLicense | 오픈소스 버전에 정의된 대표 라이선스 |
| detectedLicense | 오픈소스 버전에 추가로 발견된 라이선스 |
| version_license_diff | 오픈소스가 가지고 있는 버전별로 라이선스가 다른 경우: true |
| purl | OSS 대표 링크에 대한 purl (https://github.com/package-url/purl-spec) |
| count | 조회된 항목 전체 개수 |
| success | API 동작 결과 <br> - false : 실패 <br> - true : 성공 |

## 오픈소스 상세 정보 조회

### `/api/v1/oss/{category}/versions?searchWord={search keyword}`

{: .note }
**오소리에 등록되어 있는 오픈소스의 상세 정보를 조회할 수 있는 API 입니다.**

#### Query 매개변수 정보

| 매개변수 이름 | 세부 설명 | 
| --- | --- |
| category | 검색에 사용할 항목을 선택<br> - name<br> - download_location |
| searchWord | 검색에 사용할 단어를 입력합니다.<br> 예) facebook |

#### 사용 예제
curl --location --request GET '[https://{osori_base_url}](http://223.255.204.223:8081/api/v1/licenses?modifiedDate=&equalFlag=&page=&size=&sort=&direction=&name=&spdxIdentifier=&webpage=)**`/api/v1/oss/name/versions?searchWord=facebook`**

#### 응답 Header
Content-Type application/json

#### 응답 Body
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

#### 응답 항목 의미

| **이름** | **의미** |
| --- | --- |
| code | API 응답 상태값<br> 200: 성공 |
| oss_master_id | 오픈소스 ID (primary Key) |
| name | 오픈소스 이름 |
| download_location | 오픈소스 URL 주소 |
| purl | OSS 대표 링크에 대한 purl (https://github.com/package-url/purl-spec) |
| homepage | 오픈소스 홈페이지 URL |
| description | 오픈소스에 대한 부가 설명 |
| compliance_notice | 오픈소스 제약 사항에 대한 설명 (항목이 있을 때만 값이 존재) |
| version_license_diff | 오픈소스가 가지고 있는 버전별로 라이선스가 다른 경우: true |
| attribution | 별도로 Notification이 필요한 사항 |
| publisher | 배포자 또는 소유자 (또는 단체) |
| downloadLocationList | 오픈소스를 다운로드 받을 수 있는 URL 리스트<br> 예) http://github.com 등 |
| nicknameList | OSS를 일컫는 또 다른 이름 |
| oss_version | 오픈소스 버전 리스트 |
| oss_version_id | 오픈소스 버전 ID (primary key) |
| version | 버전 정보 |
| description | 버전별 요약 설명 (영문) |
| attribution | 별도로 Notification이 필요한 사항 |
| license_combination | declaredLicenseList에 기술된 라이선스들 사이의 논리적 결합 관계 (입력 가능 값 : AND, OR, null) |
| declaredLicense | 오픈소스 버전에 정의된 대표 라이선스 |
| detectedLicense | 오픈소스 버전에 추가로 발견된 License |
| restrictionList | 제약 조건 목록 |
