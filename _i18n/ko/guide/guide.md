# 사용 및 기여 가이드

## 활용 가이드

### 사용 주의/제약 항목 및 신호등 의미
사용 주의/제약 (Restriction) 은 사용하고자 하는 해당 오픈소스 자체 (OSS: Open Source Software) 또는 배포 라이선스 (License) 에 대한 제약 사항을 표시합니다. 하나의 OSS 또는 License에 여러개의 제약 사항이 있을 수 있습니다.

| **Restriction Name** | **Description** | **LEVEL** | **신호등** |
| --- | --- | --- | --- |
| Non-Commercial Use | 상업적 사용 불가 | 5 | 빨강 |
| Internal Use Only | 사내 사용만 가능 | 4 | 빨강 |
| No Charge | 직접적 사용 청구하지 않음 | 3 | 노랑 |
| No Sell Software itself | 자체 판매 금지<br> ex. Font, Common Clause | 2 | 노랑 |
| No Modification | 수정 금지 | 2 | 노랑 |
| No Change the Name | 이름 변경 금지 | 1 | 초록 |
| No Advertising | 홍보 금지 | 1 | 초록 |
| Platform Limitation | 특정 플랫폼에서만 사용 가능<br> ex. Museo Sans Font License: Enyo Application을 사용하기 위한 목적 | 2 | 노랑 |
| Purpose Restriction | 특정 목적 사용 제한<br> ex. The Happy Bunny License: 군사용(military) 목적으로 사용 불가 | 2 | 노랑 |
| Specification Restriction | 특정 Specification 또는 standard와 관련되어 사용 제한<br> ex. BUSL-1.1.: Additional Use Grant를 통해, 제한적인 제품 사용을 허여할 수 있음(License Header에서 Additional Use Grant 명시) | 2 | 노랑 |
| Redistribution Restriction | 재배포할 수 있는 Software의 하위 구성 요소(Source Code, Binary file 등) 제한 | 2 | 노랑 |
| Contract Required | 계약을 해야하는 경우<br> ex. 상용 SW | 5 | 빨강 |
| Provide Installation Information Required | 설치 정보 제공 의무<br> ex. GPL-3.0 | 4 | 빨강 |
| Patent Warning | 특허 분쟁 가능성 (FFmpeg 오픈소스, APSL 라이선스 등)<br> ex. APSL은 오픈소스 프로젝트에 포함된 특허로 한정된 것이 아니라,<br>"Apple" 에 대해 특허 소송을 하면 특허 라이선스 종료 | 4 | 빨강 |
| Network Triggered | 네트워크 서버 형태로 이용하는 경우에도 의무사항 준수 필요<br> ex. AGPL-3.0 | 3 | 노랑 |
| Semi-Copyleft | 코드 공개하면 해결되는 Restriction<br> (저작권자 요구, 배포 형태에 따라 다른 요구사항 요구)<br> ex. RUBY | 3 | 노랑 |

- Level: 상업적으로 사용하여 배포시 주의가 필요한 정도에 따라 1~5로 표시합니다.
- 신호등: level에 따른 색상 표시
  - 1 : 초록
  - 2~3 : 노랑
  - 4~5 : 빨강

### 라이선스 항목 정의
- Name: License 의 이름 (SPDX License인 경우 full name)
- nicknameList: License를 칭하는 또 다른 이름 목록
- spdx_identifier: https://spdx.org/licenses/ 의 Identifier
- license_text: License 원문
- osi_approval: OSI에서 approve한 license인지 여부 (https://opensource.org/licenses/)
- description: License 설명 (영문)
- description_ko: License 설명 (한글)
- obligation_disclosing_src: 배포시 소스 코드 공개 범위    

| **공개 범위 분류** | **세부 설명 및 예제** |
| --- | --- |
| NONE | 공개 의무 없음 |
| ORIGINAL | 원 오픈소스 |
| FILE | ex. MPL |
| MODULE | ex. EPL |
| LIBRARY | ex. LGPL |
| DERIVATIVE WORK | ex. EUPL 처럼 파생 저작물이라고만 명시한 경우 |
| EXECUTABLE | ex. GPL |
| DATA | ex. CDLA-Sharing-1.0 |
| SOFTWARE USING THIS | ex. SSPL, Sleepycat |
| UNSPECIFIED | 소스 공개해야 하지만, 공개 범위 정확하지 않은 경우 |
    
- obligation_notification: 배포시 고지 의무
  - false: 고지 의무 없음
  - true: 고지 의무 있음
- webpage: 대표 License 링크
- webpageList: 부가적인 해당 license의 링크
- restrictionList: 제약 조건

### OSS 항목 정의
- name: OSS의 이름
  - purl (https://github.com/package-url/purl-spec)의 name.
- **`nicknameList`**: OSS를 일컫는 또 다른 이름
- homepage: OSS의 홈페이지
- download_location: OSS를 다운로드 받을 수 있는 대표 링크
- purl: OSS 대표 링크에 대한 purl (https://github.com/package-url/purl-spec)
- **`downloadLocationList`**:  OSS 다운로드 받을 수 있는 부가적인 링크
- **`purlList`**: downloadLocationList의 purl 목록
- description: 요약 설명
- compliance_notice: 해당 오픈소스에 대한 영문 요약 설명<br>(Restriction에 담지 못하는 Compliance 관점의 추가 정보)
- compliance_notice_ko: 해당 오픈소스에 대한 한글 요약 설명<br>(Restriction에 담지 못하는 Compliance 관점의 추가 정보)
- **`version_license_diff`**: 버전별로 License가 다른 경우 True
- **`attribution`**: 별도로 Notification이 필요한 사항
- **`publisher`**: 배포자 또는 소유자 (또는 단체)
- **`oss_version`: OSS의 버전별 정보**
  - version: 버전
  - description: 버전별 요약 설명 (영문)
  - description_ko: 버전별 요약 설명 (한글)
  - license_combination: declaredLicenseList 의 License 의 결합 관계 (입력 가능 값 : AND, OR, null)
  - `declaredLicenseList`: 대표 License
  - `detectedLicenseList`: 추가로 발견된 License
  - `restrictionList`: 제약 조건
  - release_date: 배포 일시
