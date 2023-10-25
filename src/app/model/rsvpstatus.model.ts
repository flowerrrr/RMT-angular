export enum RSVPStatus {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  UNSURE = "UNSURE",
  NORESPONSE = "NORESPONSE"
}

// I18N Support ist nicht implementiert. Alles ist auf Deutsch.
export const RSVPStatusLabels = {
  [RSVPStatus.ACCEPTED]: 'Bin dabei',
  [RSVPStatus.DECLINED]: 'Komme nicht',
  [RSVPStatus.UNSURE]: 'Komme vielleicht',
  [RSVPStatus.NORESPONSE]: ''
};

export const RSVPStatusIcons = {
  [RSVPStatus.ACCEPTED]: 'thumb_up_off_alt',
  [RSVPStatus.DECLINED]: 'thumb_down_off_alt',
  [RSVPStatus.UNSURE]: 'thumbs_up_down',
  [RSVPStatus.NORESPONSE]: 'feedback'
};
