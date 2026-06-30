'use client'

import { useState } from 'react'
import Link from 'next/link'

const cases = [
  {
    id: 1,
    type: '깡통전세',
    title: '전세가율 95% 빌라, 집값 폭락 후 보증금 증발',
    location: '서울 강서구',
    amount: '1억 8천만원',
    summary: '2022년 매매가 2억 빌라에 전세 1억 8천만원 계약. 이후 집값이 1억 5천만원으로 하락하며 집주인이 보증금 반환 불가 통보.',
    cause: '전세가율 95%로 처음부터 위험 구간이었으나 공인중개사가 안전하다고 안내함.',
    result: '경매 진행 후 낙찰가 1억 4천만원. 선순위 근저당 6천만원 변제 후 임차인에게 돌아온 금액 없음.',
    lesson: '전세가율 80% 이상 매물은 반드시 기피하고, 전세보증보험 가입 여부를 사전 확인해야 합니다.',
    tag: '깡통전세',
    source: { label: 'HUG 전세사기예방센터 — 깡통전세 유형', url: 'https://www.khug.or.kr/jeonse/web/s02/s020101.jsp' },
  },
  {
    id: 2,
    type: '신탁사기',
    title: '신탁 등기된 건물, 집주인인 척한 수탁자',
    location: '경기 화성시',
    amount: '2억 3천만원',
    summary: '오피스텔 전세 계약 시 등기부등본에 신탁 등기가 있었으나 공인중개사가 문제없다고 해 계약 진행. 이후 신탁회사가 건물 매각.',
    cause: '신탁 등기 건물의 경우 수익자(집주인)가 아닌 수탁자(신탁회사)만이 임대 권한을 가짐.',
    result: '신탁회사 건물 매각 후 임차인의 보증금은 후순위로 밀려 전액 미반환.',
    lesson: '등기부등본 갑구에 신탁 등기 여부 반드시 확인. 신탁 건물은 신탁회사와 직접 계약해야 합니다.',
    tag: '신탁사기',
    source: { label: '집품 — 전세사기 수법 5가지 총정리', url: 'https://zippoom.com/%EB%B8%94%EB%A1%9C%EA%B7%B8/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0-%EC%88%98%EB%B2%95-%EB%8C%80%ED%91%9C%EC%A0%81%EC%9D%B8-5%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95/177' },
  },
  {
    id: 3,
    type: '이중계약',
    title: '한 집에 임차인 3명, 집주인의 이중 계약',
    location: '서울 노원구',
    amount: '각 8천만원',
    summary: '단독주택 1층을 집주인이 3명의 임차인과 각각 전세 계약 체결. 임차인들은 서로의 존재를 몰랐음.',
    cause: '임차인들이 전입신고를 서로 다른 날짜에 했고, 선순위 임차인이 대항력을 먼저 취득함.',
    result: '선입신고 가장 빠른 임차인만 일부 보증금 회수. 나머지 2명은 전액 피해.',
    lesson: '다가구·단독주택의 경우 주민센터에서 전입 세대 열람을 통해 선순위 임차인 보증금을 반드시 확인해야 합니다.',
    tag: '이중계약',
    source: { label: 'HUG 전세사기예방센터 — 이중계약 유형', url: 'https://www.khug.or.kr/jeonse/web/s02/s020101.jsp' },
  },
  {
    id: 4,
    type: '세금체납',
    title: '집주인 세금 9천만원 체납, 경매 후 국세 우선변제',
    location: '부산 남구',
    amount: '1억 5천만원',
    summary: '매매가 2억 5천만원 아파트에 전세 1억 5천만원 계약. 집주인이 국세 9천만원을 체납한 상태였으나 계약 전 확인하지 않음.',
    cause: '2023년 이전에는 임차인이 임대인의 세금 체납을 확인할 방법이 제한적이었음.',
    result: '경매 후 국가 세금 채권이 임차인 보증금보다 우선 변제. 보증금 3천만원만 회수.',
    lesson: '2023년부터 임차인은 임대인 동의 없이 세무서에서 체납 조회 가능. 반드시 활용하세요.',
    tag: '세금체납',
    source: { label: '나무위키 — 전세사기', url: 'https://namu.wiki/w/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0' },
  },
  {
    id: 5,
    type: '미등기건물',
    title: '미등기 신축빌라, 계약 후 등기 불가 통보',
    location: '인천 미추홀구',
    amount: '1억 2천만원',
    summary: '신축 빌라 홍보에 혹해 계약. 잔금 납부 후 건물이 미등기 상태로 전입신고 주소 등록 불가.',
    cause: '건물 준공 후 등기를 마치지 않은 상태에서 분양·임대를 진행한 사기 사례.',
    result: '전입신고 불가 → 대항력 미취득 → 집주인 잠적 → 보증금 전액 피해.',
    lesson: '계약 전 등기부등본으로 건물 등기 완료 여부 확인 필수. 미등기 건물은 절대 계약하면 안 됩니다.',
    tag: '미등기',
    source: { label: 'HUG 전세사기예방센터 — 미등기건물 유형', url: 'https://www.khug.or.kr/jeonse/web/s02/s020101.jsp' },
  },
  {
    id: 6,
    type: '공인중개사 공모',
    title: '공인중개사와 집주인의 조직적 사기',
    location: '서울 구로구',
    amount: '피해자 47명, 총 68억원',
    summary: '공인중개사가 시세보다 낮은 전세가를 제시해 피해자를 모집. 집주인과 공모해 받은 보증금을 빼돌린 후 잠적.',
    cause: '허위 시세 정보 제공, 등기부등본 위조, 보증금 편취 목적의 조직적 범행.',
    result: '피해자 47명 중 보증금 회수한 사람 없음. 주범 구속 기소.',
    lesson: '시세보다 현저히 저렴한 매물은 반드시 의심. 공인중개사 자격 여부와 직접 등기부등본 열람으로 확인해야 합니다.',
    tag: '공모사기',
    source: { label: '집품 — 전세사기 수법 5가지 총정리', url: 'https://zippoom.com/%EB%B8%94%EB%A1%9C%EA%B7%B8/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0-%EC%88%98%EB%B2%95-%EB%8C%80%ED%91%9C%EC%A0%81%EC%9D%B8-5%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95/177' },
  },
  {
    id: 7,
    type: '빌라왕',
    title: '빌라 1,000채 보유 임대인, 수백 명 보증금 미반환',
    location: '인천 미추홀구 외',
    amount: '피해자 수백 명, 피해액 수백억원',
    summary: '수천 채의 빌라를 보유한 소위 \'빌라왕\'이 신축 빌라 분양가보다 높은 전세가로 세입자를 모집. 집값 하락 후 보증금 반환 불가 상태에서 사망.',
    cause: '전세보증금으로 추가 빌라를 매입하는 갭투자 방식. 전세가율이 100%를 넘는 역전세 상태.',
    result: '임대인 사망으로 상속인과의 법적 분쟁 지속. 일부 피해자만 보증보험으로 구제.',
    lesson: '전세가율 100% 이상 매물은 절대 계약 금지. 신축 빌라 분양가 대비 전세가 비교는 필수입니다.',
    tag: '깡통전세',
    source: { label: '나무위키 — 2022년 빌라왕 사태', url: 'https://namu.wiki/w/2022%EB%85%84%20%EB%B9%8C%EB%9D%BC%EC%99%95%20%EC%82%AC%ED%83%9C/%EB%AF%B8%EC%B6%94%ED%99%80%EA%B5%AC%20%EB%82%A8%20%EB%AA%A8%20%EC%94%A8%20%EC%82%AC%EA%B1%B4' },
  },
  {
    id: 8,
    type: '역전세',
    title: '전세가 하락으로 새 세입자 못 구해 보증금 미반환',
    location: '경기 수원시',
    amount: '2억 1천만원',
    summary: '2021년 전세 계약 후 2023년 만기 도래. 전세 시장 침체로 집주인이 같은 금액의 새 세입자를 구하지 못해 보증금 반환 거부.',
    cause: '금리 인상으로 전세 수요 감소, 시세보다 높은 기존 보증금 반환을 위한 신규 계약 불가.',
    result: '임차인이 임의경매 신청. 낙찰가 하락으로 보증금 전액 회수 불가, 4천만원 손실.',
    lesson: '계약 만기 6개월 전부터 갱신 여부를 확인하고, 전세보증반환보증에 가입해두면 이런 상황을 예방할 수 있어요.',
    tag: '깡통전세',
    source: { label: '집품 — 아파트 전세사기 유형 총정리', url: 'https://zippoom.com/%EB%B8%94%EB%A1%9C%EA%B7%B8/%EC%95%84%ED%8C%8C%ED%8A%B8-%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0-%ED%94%BC%ED%95%B4-%EC%98%88%EB%B0%A9%EB%B2%95/217' },
  },
  {
    id: 9,
    type: '위조서류',
    title: '등기부등본 위조로 근저당 숨긴 사기',
    location: '서울 은평구',
    amount: '1억 7천만원',
    summary: '집주인이 근저당이 설정된 등기부등본을 위조해 깨끗한 서류처럼 보여주고 계약 체결. 임차인은 직접 열람하지 않고 중개사가 출력한 서류만 확인.',
    cause: '임차인이 직접 등기부등본을 발급받지 않고, 중개사가 제공한 출력물만 신뢰함.',
    result: '실제 근저당 1억 2천만원 확인. 경매 후 임차인 수령액 5천만원에 그침.',
    lesson: '등기부등본은 반드시 본인이 직접 대법원 인터넷등기소에서 발급받아야 합니다. 중개사 제공 서류는 위조 가능성이 있어요.',
    tag: '공모사기',
    source: { label: '한경부동산밸류업 — 전세사기 이렇게 하면 막을 수 있다', url: 'https://landvalueup.hankyung.com/issuecheck-2026-0604-0700' },
  },
  {
    id: 10,
    type: '대출사기',
    title: '전세자금대출 유도 후 잠적, 금융기관도 피해',
    location: '대구 달서구',
    amount: '2억 5천만원',
    summary: '집주인이 전세자금대출이 잘 나온다며 적극 유도. 대출 실행 직후 보증금 수령 뒤 잠적. 임차인은 대출금 상환 의무만 남음.',
    cause: '집주인이 대출 가능 여부와 조건을 사전에 파악해 피해자를 유도. 대출 실행 후 바로 자금 인출.',
    result: '집주인 잠적 후 주소 불명. 임차인은 전세자금대출 2억 5천만원 원리금 상환 중.',
    lesson: '집주인이 전세자금대출을 먼저 권유할 때는 의심해야 해요. 대출 실행 전 집주인 신원과 부동산 상태를 철저히 확인하세요.',
    tag: '공모사기',
    source: { label: 'HUG 전세사기예방센터 — 유형별 사례', url: 'https://www.khug.or.kr/jeonse/web/s02/s020101.jsp' },
  },
  {
    id: 11,
    type: '묵시적갱신',
    title: '묵시적 갱신 후 이사, 3개월 전 통보 몰라 보증금 지연',
    location: '서울 동대문구',
    amount: '8천만원',
    summary: '계약 만기 2개월 전 이사 통보. 집주인이 묵시적 갱신 중에는 세입자가 3개월 전 통보해야 한다며 3개월치 월세 공제 후 반환 주장.',
    cause: '임차인이 주택임대차보호법상 묵시적 갱신 시 해지 통보 규정을 몰랐음.',
    result: '법적 분쟁 끝에 임차인 일부 패소. 1개월분 손실 후 합의.',
    lesson: '묵시적 갱신 상태에서는 3개월 전에 해지를 통보해야 해요. 계약 만기 2개월 전까지 갱신 거절 의사를 명확히 밝혀두세요.',
    tag: '이중계약',
    source: { label: '나무위키 — 전세사기', url: 'https://namu.wiki/w/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0' },
  },
  {
    id: 12,
    type: '건축왕',
    title: '인천 미추홀구 건축왕 — 665세대, 536억원 전세사기',
    location: '인천 미추홀구',
    amount: '665세대, 총 536억원',
    summary: '60대 남 모씨가 지인 명의로 나홀로 아파트·빌라를 신축한 뒤 주택담보대출과 전세보증금을 동시에 받아 자금을 돌려막는 방식으로 2,700여 채를 운용. 집값 하락 후 경매가 쏟아지며 피해 속출.',
    cause: '준공 직후 담보대출 + 전세 이중 수취. 전세가율이 매매가를 초과한 상태에서 신축이라는 이유로 임차인들이 안전하다고 믿음.',
    result: '2025년 1월 대법원 징역 7년 확정. 피해자 665세대 중 대부분 보증금 미회수. 피해자 중 20~30대 청년 수 명 극단적 선택.',
    lesson: '신축 빌라라도 반드시 등기부등본 확인, 전세가율 80% 이하 매물만 계약하세요. 준공 직후 매물은 시세 확인이 어려워 특히 주의가 필요합니다.',
    tag: '깡통전세',
    source: { label: '경향신문 — 인천 미추홀구 건축왕 대법 징역 7년 확정', url: 'https://www.khan.co.kr/article/202501231100021' },
  },
  {
    id: 13,
    type: '수원일가족',
    title: '수원 일가족 전세사기 — 675가구, 760억원',
    location: '경기 수원시',
    amount: '675가구, 총 760억원',
    summary: '정씨 일가족이 빌라·오피스텔 51개 건물 816채를 보유하며 세입자 보증금을 받아 게임 아이템 구매 등에 탕진하는 돌려막기를 반복. 피해자 대부분이 사회 초년생.',
    cause: '보증금 돌려막기 구조로 임대사업 운영. 피해주택 675가구 중 보증금 반환 보험 가입 세대는 2채에 불과.',
    result: '2024년 12월 수원지방법원 주범 징역 15년, 공범 배우자 징역 6년, 감정평가사 아들 징역 4년 선고.',
    lesson: '사회 초년생일수록 전세보증보험 가입이 필수예요. 보증금 반환 보험은 계약 체결 후 즉시 가입하세요.',
    tag: '깡통전세',
    source: { label: '나무위키 — 수원 일가족 전세사기 사건', url: 'https://namu.wiki/w/%EC%88%98%EC%9B%90%20%EC%9D%BC%EA%B0%80%EC%A1%B1%20%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0%20%EC%82%AC%EA%B1%B4' },
  },
  {
    id: 14,
    type: '대전부부',
    title: '대전 부부 전세사기 — 해외 도주 후 추방',
    location: '대전광역시',
    amount: '90명, 총 62억원',
    summary: '2019년~2023년 대전 일대에서 90명과 전세 계약을 체결해 62억원의 보증금을 편취한 부부. 사기 발각 후 미국으로 도주.',
    cause: '정상적인 반환 계획 없이 보증금을 개인 용도로 사용. 임차인들은 전세보증보험 미가입 상태였음.',
    result: '2024년 9월 경찰 검거 요청. 2024년 12월 미국 연방 이민세관국(ICE)이 한국으로 강제 추방. 현재 재판 진행 중.',
    lesson: '해외 도주로 수년간 보증금 회수가 불가능했던 사례예요. 전세보증보험 가입 시 보증기관이 우선 반환해주는 구조가 얼마나 중요한지 보여줍니다.',
    tag: '공모사기',
    source: { label: '나무위키 — 대전 부부 전세사기 사건', url: 'https://namu.wiki/w/%EB%8C%80%EC%A0%84%20%EB%B6%80%EB%B6%80%20%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0%20%EC%82%AC%EA%B1%B4' },
  },
  {
    id: 15,
    type: '월세위장',
    title: '중개사가 집주인에겐 월세, 세입자에겐 전세로 이중 계약',
    location: '서울 강북구',
    amount: '1억 1천만원',
    summary: '무자격 공인중개사가 집주인에게는 월세 계약을 진행했다고 알리고, 세입자에게는 전세 계약서를 작성해 보증금을 편취. 집주인도 사기 피해자가 되는 구조.',
    cause: '중개사 자격증을 타인에게 빌려 운영하는 불법 중개사무소. 집주인과 임차인 모두 중개사를 신뢰해 서류를 직접 확인하지 않음.',
    result: '중개사 구속 기소. 집주인은 보증금 반환 의무 없다는 판결. 세입자 전액 피해.',
    lesson: '공인중개사 자격증 실명 여부를 반드시 확인하세요. 국가공간정보포털 또는 한국공인중개사협회 앱에서 즉시 조회 가능해요.',
    tag: '이중계약',
    source: { label: '집품 — 전세사기 수법 5가지 총정리', url: 'https://zippoom.com/%EB%B8%94%EB%A1%9C%EA%B7%B8/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0-%EC%88%98%EB%B2%95-%EB%8C%80%ED%91%9C%EC%A0%81%EC%9D%B8-5%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95/177' },
  },
]

const tags = ['전체', '깡통전세', '신탁사기', '이중계약', '세금체납', '미등기', '공모사기']


export default function CasesPage() {
  const [selected, setSelected] = useState('전체')
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered = selected === '전체' ? cases : cases.filter(c => c.tag === selected)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black">전세사기 피해 사례</h1>
        <p className="text-sm text-gray-400 mt-1">실제 피해 사례로 배우는 전세사기 유형</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelected(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === tag ? 'bg-black text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-black'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenId(openId === c.id ? null : c.id)}
              className="w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">{c.tag}</span>
                    <span className="text-xs text-gray-400">{c.location}</span>
                  </div>
                  <h3 className="font-bold text-sm">{c.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">피해금액 <span className="font-semibold text-red-500">{c.amount}</span></p>
                </div>
                <span className="text-gray-300 text-lg">{openId === c.id ? '∧' : '∨'}</span>
              </div>
            </button>

            {openId === c.id && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                {[
                  { label: '사건 개요', content: c.summary },
                  { label: '사기 원인', content: c.cause },
                  { label: '결과', content: c.result },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <p className="text-xs font-bold text-gray-400 mb-1">{label}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
                  </div>
                ))}
                <div className="bg-black text-white rounded-xl p-4">
                  <p className="text-xs font-bold mb-1">핵심 교훈</p>
                  <p className="text-sm leading-relaxed">{c.lesson}</p>
                </div>
                <a href={c.source.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-300 hover:text-black hover:underline transition-colors">
                  출처: {c.source.label} →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link href="/support" className="block text-center bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors">
        피해 발생 시 대처 방법 보기 →
      </Link>

    </div>
  )
}
