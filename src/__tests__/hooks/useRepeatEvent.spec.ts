import { renderHook } from '@testing-library/react';
import { useRepeatEvent } from '../../hooks/useRepeatEvent';
import { EventForm } from '../../types';

describe('useRepeatEvent', () => {
  const mockEventForm: EventForm = {
    title: '테스트 일정',
    date: '2024-01-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '테스트 설명',
    location: '테스트 장소',
    category: '업무',
    repeat: {
      type: 'daily',
      interval: 1,
      endDate: '2024-01-03',
    },
    notificationTime: 10,
  };

  // 기본 반복 일정 생성
  it('매일 반복 일정을 3일간 생성한다', () => {
    const { result } = renderHook(() => useRepeatEvent(mockEventForm));

    expect(result.current.repeatedEvents).toHaveLength(3);
    expect(result.current.repeatedEvents[0].date).toBe('2024-01-01');
    expect(result.current.repeatedEvents[1].date).toBe('2024-01-02');
    expect(result.current.repeatedEvents[2].date).toBe('2024-01-03');

    // 모든 이벤트가 같은 시간과 내용을 가져야 함
    result.current.repeatedEvents.forEach((event) => {
      expect(event.title).toBe('테스트 일정');
      expect(event.startTime).toBe('09:00');
      expect(event.endTime).toBe('10:00');
      expect(event.repeat.type).toBe('daily');
    });
  });
  it('매주 반복 일정을 4주간 생성한다', () => {});
  it('매월 반복 일정을 6개월간 생성한다', () => {});
  it('매년 반복 일정을 3년간 생성한다', () => {});

  // 반복 간격 처리
  it('2일마다 반복하는 일정을 생성한다', () => {});
  it('3주마다 반복하는 일정을 생성한다', () => {});

  // 종료 조건 처리
  it('종료일이 지정된 경우 해당 날짜까지만 생성한다', () => {});
  it('종료일이 없는 경우 2025-06-30까지 생성한다', () => {});

  // 예외 상황 처리
  it('31일에 매월 반복 시 31일이 없는 달은 건너뛴다', () => {});
  it('윤년 2월 29일에 매년 반복 시 평년에는 건너뛴다', () => {});

  // 유효성 검증
  it('종료일이 시작일보다 이전이면 빈 배열을 반환한다', () => {});
  it('반복 간격이 0 이하면 빈 배열을 반환한다', () => {});
});
