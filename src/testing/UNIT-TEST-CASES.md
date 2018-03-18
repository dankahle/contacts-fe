




### more actions
no functionality for this in contactListItem, BUT... have functionality in it for contactDetail as it needs to close detail dialog if:
remove from label
delete contact

So.. just wrapping more actions isn't enough. So... need to test these two in the dialog, anyway you can, just call manually? I suppose, call manually, then verify they do what they say.

## dialogs
### contact detail
* should show all data
* should call correct method/services for edit/moreactions/close buttons

### contact edit
* data empty in init (add)
* all multiple fields extend (add)
* injected data good (edit mode)
* all inputs and labels set to correct data (edit mode)
* all fields clear and delete if multiple
* filtering menu choices
* ngOnDestroy unsubscribes to subscriptions (you'll have to manually call it)
* updateNameAndCompanyValidation() called on (input/blur)
* hasNameOrCompany
* addMissingFields
* removeEmptyFields
* cancelDialog
* submit

