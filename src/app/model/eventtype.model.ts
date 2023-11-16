export enum EventType {
  Event = 'Event',
  Match = 'Match',
  Training = 'Training',
  Tournament = 'Tournament'
}

// I18N Support ist nicht implementiert. Alles ist auf Deutsch.
export const EventTypeLabels = {
  [EventType.Event]: 'Event',
  [EventType.Match]: 'Spiel',
  [EventType.Training]: 'Training',
  [EventType.Tournament]: 'Turnier',
};

