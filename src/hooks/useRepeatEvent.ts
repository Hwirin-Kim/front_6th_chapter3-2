import { useMemo } from 'react';
import { Event, EventForm } from '../types';

export const useRepeatEvent = (eventForm: EventForm) => {
  const repeatedEvents = useMemo(() => {
    if (eventForm.repeat.type === 'none') {
      return [];
    }

    const events: Event[] = [];
    const startDate = new Date(eventForm.date);
    const endDate = eventForm.repeat.endDate
      ? new Date(eventForm.repeat.endDate)
      : new Date('2025-06-30');

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // 각 일정에 고유 ID 생성 (임시로 날짜 기반)
      const dateStr = currentDate.toISOString().split('T')[0];

      events.push({
        ...eventForm,
        id: `${eventForm.title}-${dateStr}-${Math.random().toString(36).substr(2, 9)}`,
        date: dateStr,
        repeat: {
          ...eventForm.repeat,
          id: `repeat-${eventForm.title}-${Math.random().toString(36).substr(2, 9)}`,
        },
      });

      // 다음 날짜 계산 (현재는 매일만 지원)
      if (eventForm.repeat.type === 'daily') {
        currentDate.setDate(currentDate.getDate() + eventForm.repeat.interval);
      } else {
        break; // 다른 타입은 아직 미구현
      }
    }

    return events;
  }, [eventForm]);

  return {
    repeatedEvents,
    isValidRepeat: repeatedEvents.length > 0,
  };
};
