
It bears mention the hierarchy of page objects. I.e. you have to avoid circular refrence. Say you have a LeftNavPO that adds a label and uses a LabelEditPO, then when you want to test LabelEditComponent, you'd like to use the standup method in LeftnavPO, but this is circular and will get the cryptic message:
"Error: TypeError: label_po_1.LabelPO is not a constructor" or similar. So we need a heirarchy:
big page things >> smaller page things (dialog/menu/form?/etc) >> helper page objects

So we'll try helper page objects when we have something that both big and small need to avoid duplicity of code. If both need it, move it to a helper that won't be looking anywhere else, the end of the line. If we look at contact list po, we see this currently:

contact list:
const po = new ContactListPO();
  const poContactEdit = new ContactEditPO(); >> none
  const poContactDelete = new ContactDeletePO(); >> none
  const poContactMoreActions = new ContactMoreActionsPO(); >> none
  const poContactEditClose = new ContactEditClosePO(); >> none
  const poLabel = new LabelPO();
    const poLabelEdit = new LabelEditPO(); >> labelPO(circular failure)
    const poLabelDelete = new LabelDeletePO;
  const poContactDetail = new ContactDetailPO(); >> none


so putting the dialogs/menus at the bottom make sense. Now to get some helpers in there so we can reuse code when testing the dialogs, but maybe not. Dialog testing will flush it out.
