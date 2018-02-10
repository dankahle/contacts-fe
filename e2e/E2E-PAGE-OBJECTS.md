
#### We need to structure the page object hierarchy to avoid circular references

We have to avoid circular refrence in page objects. Say you have a LeftNavPO that adds a label and uses a LabelEditPO, then when you want to test LabelEditComponent, you'd like to use the standup method in LeftnavPO, but this is circular and will get the cryptic message:
"Error: TypeError: label_po_1.LabelPO is not a constructor" or similar. So we need a heirarchy:
big page things >> smaller page things (dialog/menu/form?/etc) >> helper page objects?
I.e. maybe we can push stuff lower so it can be shared between po's. For now, just keep dialogs at the bottom. Here's the current contactList po, it's dependencies and their dependencies. This is all getting to be an issue now that we're down to testing dialogs. We'd like the higher level methods to instantiate them, but that would be circular. Pushing instantiation lower to a helper object, just displaces things. Maybe best to duplicate code.

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


