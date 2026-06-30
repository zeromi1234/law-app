'use client'

const steps = [
  {
    step: 1,
    title: '계약 전 — 등기부등본 확인',
    items: [
      '대법원 인터넷등기소에서 등기부등본 발급 (700원)',
      '을구에서 근저당 설정 금액 확인',
      '갑구에서 압류·가처분·경매 이력 확인',
      '소유자가 임대인과 동일인인지 확인',
      '근저당 + 전세보증금이 매매가의 80% 이하인지 확인',
    ],
  },
  {
    step: 2,
    title: '계약 전 — 집주인 확인',
    items: [
      '신분증으로 임대인 본인 여부 확인',
      '대리인 계약 시 위임장 + 인감증명서 확인',
      '관할 세무서에서 집주인 세금 체납 여부 조회',
      '건축물대장으로 건물 소유자 확인',
      '다가구 주택이라면 선순위 임차인 보증금 총액 확인',
    ],
  },
  {
    step: 3,
    title: '계약 당일 — 계약서 작성',
    items: [
      '계약서에 실제 주소·층수·호수 정확히 기재',
      '보증금 금액 숫자와 한글 병기 확인',
      '특약사항에 "전세보증보험 가입 동의" 명시',
      '잔금일에 등기부등본 재확인 조건 특약 추가',
      '확정일자 당일 받기 (주민센터 또는 온라인)',
    ],
  },
  {
    step: 4,
    title: '잔금일 — 입주 당일',
    items: [
      '잔금 지급 전 등기부등본 다시 한 번 확인',
      '잔금 지급 즉시 전입신고 (당일 완료)',
      '전입신고 완료 후 확정일자 확인',
      '전세보증보험 가입 신청 (HUG 또는 SGI)',
      '임대차 계약서 사본 안전한 곳에 보관',
    ],
  },
  {
    step: 5,
    title: '입주 후 — 계약 기간 중',
    items: [
      '집주인 변경 시 새 소유자에게 대항력 확인',
      '경매·공매 통지 수령 시 즉시 법률 상담',
      '계약 만료 2개월 전 갱신 또는 퇴거 의사 통보',
      '보증금 반환일 전 이사 금지 (대항력 유지)',
      '보증금 미반환 시 임차권등기명령 즉시 신청',
    ],
  },
]

export function downloadChecklist(checked: Record<string, boolean>) {
  const logoUrl = `${window.location.origin}/logo.png`

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>집터뷰 체크리스트</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif;
      font-size: 11pt;
      color: #111;
      background: #fff;
      padding: 32px 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #000;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .header-left { display: flex; align-items: center; gap: 10px; }
    .header-logo { width: 36px; height: 36px; object-fit: contain; }
    .header-title { font-size: 20pt; font-weight: 900; }
    .doc-title { font-size: 15pt; font-weight: 800; margin-bottom: 4px; }
    .doc-sub { font-size: 9pt; color: #888; margin-bottom: 20px; }
    .step { margin-bottom: 18px; }
    .step-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .step-num {
      width: 20px; height: 20px;
      background: #000; color: #fff;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 9pt; font-weight: 800;
      flex-shrink: 0;
    }
    .step-title { font-size: 11pt; font-weight: 800; }
    .item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-left: 28px;
      margin-bottom: 7px;
    }
    .box {
      width: 13px; height: 13px;
      border: 1.5px solid #000;
      border-radius: 2px;
      flex-shrink: 0;
      margin-top: 1px;
      display: flex; align-items: center; justify-content: center;
    }
    .box.checked { background: #000; }
    .box.checked::after { content: '✓'; color: #fff; font-size: 8pt; line-height: 1; }
    .item-text { font-size: 9.5pt; line-height: 1.55; }
    .item-text.done { color: #aaa; text-decoration: line-through; }
    .footer {
      margin-top: 30px;
      border-top: 1px solid #eee;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #aaa;
    }
    @media print {
      body { padding: 20px 30px; }
      @page { margin: 0.5cm 1cm; size: A4; }
    }
    @page { margin: 0.5cm 1cm; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <img class="header-logo" src="${logoUrl}" alt="집터뷰 로고" />
      <span class="header-title">집터뷰</span>
    </div>
  </div>
  <div class="doc-title">전세 계약 전 체크리스트</div>
  <div class="doc-sub">전세사기 예방을 위한 단계별 확인 항목</div>
  ${steps.map(s => `
  <div class="step">
    <div class="step-header">
      <div class="step-num">${s.step}</div>
      <div class="step-title">${s.title}</div>
    </div>
    ${s.items.map((item, i) => {
      const key = `${s.step}-${i}`
      const isChecked = !!checked[key]
      return `
    <div class="item">
      <div class="box${isChecked ? ' checked' : ''}"></div>
      <span class="item-text${isChecked ? ' done' : ''}">${item}</span>
    </div>`
    }).join('')}
  </div>`).join('')}
  <div class="footer">
    <span>집터뷰 — 전세사기 예방 서비스</span>
    <span>본 문서는 참고용이며 법적 효력이 없습니다.</span>
  </div>
  <script>window.onload = () => { window.print(); window.onafterprint = () => window.close(); }</script>
</body>
</html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
}

export async function downloadChecklistAsJpg(checked: Record<string, boolean>) {
  const logoUrl = `${window.location.origin}/logo.png`
  const div = document.createElement('div')
  div.style.cssText = 'position:fixed;left:-9999px;top:0;width:600px;background:#fff;padding:40px;font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;'

  div.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;border-bottom:2px solid #000;padding-bottom:14px;margin-bottom:20px;">
      <img src="${logoUrl}" style="width:36px;height:36px;" />
      <span style="font-size:20px;font-weight:900;">집터뷰</span>
    </div>
    <div style="font-size:16px;font-weight:800;margin-bottom:4px;">전세 계약 전 체크리스트</div>
    <div style="font-size:9px;color:#888;margin-bottom:20px;">전세사기 예방을 위한 단계별 확인 항목</div>
    ${steps.map(s => `
      <div style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <div style="width:20px;height:20px;border-radius:50%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;flex-shrink:0;">${s.step}</div>
          <div style="font-size:11px;font-weight:800;">${s.title}</div>
        </div>
        ${s.items.map((item, i) => {
          const key = `${s.step}-${i}`
          const isChecked = !!checked[key]
          return `
          <div style="display:flex;align-items:flex-start;gap:8px;margin-left:28px;margin-bottom:6px;">
            <div style="width:12px;height:12px;border:1.5px solid #000;border-radius:2px;flex-shrink:0;margin-top:1px;background:${isChecked ? '#000' : '#fff'};display:flex;align-items:center;justify-content:center;">
              ${isChecked ? '<span style="color:#fff;font-size:8px;line-height:1;">v</span>' : ''}
            </div>
            <span style="font-size:9.5px;line-height:1.55;color:${isChecked ? '#aaa' : '#333'};text-decoration:${isChecked ? 'line-through' : 'none'};">${item}</span>
          </div>`
        }).join('')}
      </div>
    `).join('')}
    <div style="border-top:1px solid #eee;padding-top:10px;display:flex;justify-content:space-between;font-size:8px;color:#aaa;margin-top:10px;">
      <span>집터뷰 — 전세사기 예방 서비스</span>
      <span>본 문서는 참고용이며 법적 효력이 없습니다.</span>
    </div>
  `

  document.body.appendChild(div)

  try {
    const domtoimage = (await import('dom-to-image-more')).default
    const dataUrl = await domtoimage.toJpeg(div, { quality: 0.95, bgcolor: '#ffffff', scale: 2 })
    const link = document.createElement('a')
    link.download = `집터뷰_체크리스트_${new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '')}.jpg`
    link.href = dataUrl
    link.click()
  } finally {
    document.body.removeChild(div)
  }
}
