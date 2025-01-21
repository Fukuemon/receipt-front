import styled from '@emotion/styled'

export const StyleWrapper = styled.div`
  height: 100%;
  .fc {
    height: 100%;
  }

  .fc-view {
    height: 100%;
  }

  .fc-scrollgrid {
    height: 100%;
  }

  .fc-scroller-harness {
    height: 100%;
  }

  .fc-scroller {
    height: 100%;
  }

  .fc-daygrid-body {
    height: 100%;
  }

  .fc .fc-scrollgrid-section-body table,
  .fc .fc-scrollgrid-section-footer table {
    height: 100%;
  }

  // 曜日の枠線に影を追加
  .fc-scrollgrid-section.fc-scrollgrid-section-header.fc-scrollgrid-section-sticky {
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.4);
  }

  // 時間軸の枠線
  .fc-timegrid-col.fc-timegrid-axis {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
    border: 1px var(--gray-200) solid;
  }

  // カレンダーのヘッダーを非表示
  .fc .fc-toolbar {
    display: none;
  }

  // 各日付の数字を中央揃えに
  .fc-daygrid-day-top {
    justify-content: center;
  }

  // イベントのホバーエフェクト
  fc-event-title-container {
    transition: background-color 0.3s;
  }
`
