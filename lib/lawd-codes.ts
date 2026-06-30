// 법정동 코드 (시군구 5자리)
export const lawdCodes: { keywords: string[]; code: string; region: '서울' | '수도권' | '광역시' | '지방' }[] = [
  // 서울
  { keywords: ['서울', '종로구'], code: '11110', region: '서울' },
  { keywords: ['서울', '중구'], code: '11140', region: '서울' },
  { keywords: ['서울', '용산구'], code: '11170', region: '서울' },
  { keywords: ['서울', '성동구'], code: '11200', region: '서울' },
  { keywords: ['서울', '광진구'], code: '11215', region: '서울' },
  { keywords: ['서울', '동대문구'], code: '11230', region: '서울' },
  { keywords: ['서울', '중랑구'], code: '11260', region: '서울' },
  { keywords: ['서울', '성북구'], code: '11290', region: '서울' },
  { keywords: ['서울', '강북구'], code: '11305', region: '서울' },
  { keywords: ['서울', '도봉구'], code: '11320', region: '서울' },
  { keywords: ['서울', '노원구'], code: '11350', region: '서울' },
  { keywords: ['서울', '은평구'], code: '11380', region: '서울' },
  { keywords: ['서울', '서대문구'], code: '11410', region: '서울' },
  { keywords: ['서울', '마포구'], code: '11440', region: '서울' },
  { keywords: ['서울', '양천구'], code: '11470', region: '서울' },
  { keywords: ['서울', '강서구'], code: '11500', region: '서울' },
  { keywords: ['서울', '구로구'], code: '11530', region: '서울' },
  { keywords: ['서울', '금천구'], code: '11545', region: '서울' },
  { keywords: ['서울', '영등포구'], code: '11560', region: '서울' },
  { keywords: ['서울', '동작구'], code: '11590', region: '서울' },
  { keywords: ['서울', '관악구'], code: '11620', region: '서울' },
  { keywords: ['서울', '서초구'], code: '11650', region: '서울' },
  { keywords: ['서울', '강남구'], code: '11680', region: '서울' },
  { keywords: ['서울', '송파구'], code: '11710', region: '서울' },
  { keywords: ['서울', '강동구'], code: '11740', region: '서울' },
  // 경기
  { keywords: ['수원', '장안구'], code: '41111', region: '수도권' },
  { keywords: ['수원', '권선구'], code: '41113', region: '수도권' },
  { keywords: ['수원', '팔달구'], code: '41115', region: '수도권' },
  { keywords: ['수원', '영통구'], code: '41117', region: '수도권' },
  { keywords: ['성남', '수정구'], code: '41131', region: '수도권' },
  { keywords: ['성남', '중원구'], code: '41133', region: '수도권' },
  { keywords: ['성남', '분당구'], code: '41135', region: '수도권' },
  { keywords: ['의정부'], code: '41150', region: '수도권' },
  { keywords: ['안양', '만안구'], code: '41171', region: '수도권' },
  { keywords: ['안양', '동안구'], code: '41173', region: '수도권' },
  { keywords: ['부천'], code: '41190', region: '수도권' },
  { keywords: ['광명'], code: '41210', region: '수도권' },
  { keywords: ['평택'], code: '41220', region: '수도권' },
  { keywords: ['안산', '상록구'], code: '41271', region: '수도권' },
  { keywords: ['안산', '단원구'], code: '41273', region: '수도권' },
  { keywords: ['고양', '덕양구'], code: '41281', region: '수도권' },
  { keywords: ['고양', '일산동구'], code: '41285', region: '수도권' },
  { keywords: ['고양', '일산서구'], code: '41287', region: '수도권' },
  { keywords: ['과천'], code: '41290', region: '수도권' },
  { keywords: ['구리'], code: '41310', region: '수도권' },
  { keywords: ['남양주'], code: '41360', region: '수도권' },
  { keywords: ['오산'], code: '41370', region: '수도권' },
  { keywords: ['시흥'], code: '41390', region: '수도권' },
  { keywords: ['군포'], code: '41410', region: '수도권' },
  { keywords: ['의왕'], code: '41430', region: '수도권' },
  { keywords: ['하남'], code: '41450', region: '수도권' },
  { keywords: ['용인', '처인구'], code: '41461', region: '수도권' },
  { keywords: ['용인', '기흥구'], code: '41463', region: '수도권' },
  { keywords: ['용인', '수지구'], code: '41465', region: '수도권' },
  { keywords: ['파주'], code: '41480', region: '수도권' },
  { keywords: ['화성'], code: '41590', region: '수도권' },
  { keywords: ['김포'], code: '41570', region: '수도권' },
  { keywords: ['광주'], code: '41610', region: '수도권' },
  { keywords: ['양주'], code: '41630', region: '수도권' },
  // 인천
  { keywords: ['인천', '중구'], code: '28110', region: '수도권' },
  { keywords: ['인천', '동구'], code: '28140', region: '수도권' },
  { keywords: ['인천', '미추홀구'], code: '28177', region: '수도권' },
  { keywords: ['인천', '연수구'], code: '28185', region: '수도권' },
  { keywords: ['인천', '남동구'], code: '28200', region: '수도권' },
  { keywords: ['인천', '부평구'], code: '28237', region: '수도권' },
  { keywords: ['인천', '계양구'], code: '28245', region: '수도권' },
  { keywords: ['인천', '서구'], code: '28260', region: '수도권' },
  // 부산
  { keywords: ['부산', '중구'], code: '26110', region: '광역시' },
  { keywords: ['부산', '서구'], code: '26140', region: '광역시' },
  { keywords: ['부산', '동구'], code: '26170', region: '광역시' },
  { keywords: ['부산', '영도구'], code: '26200', region: '광역시' },
  { keywords: ['부산', '부산진구'], code: '26230', region: '광역시' },
  { keywords: ['부산', '동래구'], code: '26260', region: '광역시' },
  { keywords: ['부산', '남구'], code: '26290', region: '광역시' },
  { keywords: ['부산', '북구'], code: '26320', region: '광역시' },
  { keywords: ['해운대구'], code: '26350', region: '광역시' },
  { keywords: ['부산', '사하구'], code: '26380', region: '광역시' },
  { keywords: ['금정구'], code: '26410', region: '광역시' },
  { keywords: ['부산', '강서구'], code: '26440', region: '광역시' },
  { keywords: ['연제구'], code: '26470', region: '광역시' },
  { keywords: ['수영구'], code: '26500', region: '광역시' },
  { keywords: ['사상구'], code: '26530', region: '광역시' },
  // 대구
  { keywords: ['대구', '중구'], code: '27110', region: '광역시' },
  { keywords: ['대구', '동구'], code: '27140', region: '광역시' },
  { keywords: ['대구', '서구'], code: '27170', region: '광역시' },
  { keywords: ['대구', '남구'], code: '27200', region: '광역시' },
  { keywords: ['대구', '북구'], code: '27230', region: '광역시' },
  { keywords: ['수성구'], code: '27260', region: '광역시' },
  { keywords: ['달서구'], code: '27290', region: '광역시' },
  // 대전
  { keywords: ['대전', '동구'], code: '30110', region: '광역시' },
  { keywords: ['대전', '중구'], code: '30140', region: '광역시' },
  { keywords: ['대전', '서구'], code: '30170', region: '광역시' },
  { keywords: ['유성구'], code: '30200', region: '광역시' },
  { keywords: ['대덕구'], code: '30230', region: '광역시' },
  // 광주
  { keywords: ['광주', '동구'], code: '29110', region: '광역시' },
  { keywords: ['광주', '서구'], code: '29140', region: '광역시' },
  { keywords: ['광주', '남구'], code: '29155', region: '광역시' },
  { keywords: ['광주', '북구'], code: '29170', region: '광역시' },
  { keywords: ['광산구'], code: '29200', region: '광역시' },
  // 울산
  { keywords: ['울산', '중구'], code: '31110', region: '광역시' },
  { keywords: ['울산', '남구'], code: '31140', region: '광역시' },
  { keywords: ['울산', '동구'], code: '31170', region: '광역시' },
  { keywords: ['울산', '북구'], code: '31200', region: '광역시' },
  { keywords: ['울주군'], code: '31710', region: '광역시' },
  // 세종
  { keywords: ['세종'], code: '36110', region: '지방' },
]

export type RegionType = '서울' | '수도권' | '광역시' | '지방'

export function parseAddress(address: string): { code: string; region: RegionType } | null {
  for (const entry of lawdCodes) {
    const matched = entry.keywords.every(kw => address.includes(kw))
    if (matched) return { code: entry.code, region: entry.region }
  }
  // 키워드 1개만 매칭
  for (const entry of lawdCodes) {
    if (entry.keywords.some(kw => kw.length >= 3 && address.includes(kw))) {
      return { code: entry.code, region: entry.region }
    }
  }
  return null
}

export function getRegionThresholds(region: RegionType) {
  switch (region) {
    case '서울':    return { caution: 70, danger: 80 }
    case '수도권':  return { caution: 65, danger: 75 }
    case '광역시':  return { caution: 60, danger: 70 }
    default:        return { caution: 55, danger: 65 }
  }
}
