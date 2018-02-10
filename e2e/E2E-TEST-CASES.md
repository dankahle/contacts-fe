
done### search
* search icon sets focus to input
* clear icon clears input
* search text yields correct dropdown results (nothing)
* search text yields correct dropdown results (something)
* search text yields correct dropdown results (label chosen (still searches all))
* clear input, results go away

done### leftnav
* header button opens/closes
* responsive: open for gt-sm, closed for lt-sm
* close for gt-sm if was closed before going lt-sm

done### labels
* accordion works for labels/extras
* default (contacts) shows all contacts, label two shows 2, label three shows none
* create label // dialog
* edit label // dialog
* delete label no contacts deletes
* delete label with contacts keep contacts // dialog
* delete label with contacts toss contacts // dialog

done### contact list
* responsive: notes, phone, email disappear at appropriate breakpoints
* in label tests - shows appropriate contacts for contactsLabel and other labels
* shows no contacts when label zthree is picked
* add contact brings up edit dialog
* click on contact brings up appropriate detail dialog
* edit icon click brings up edit dialog
* delete icon click brings up contact delete dialog
* clicking on link spawns new tab in browser, or maybe just check it's a link with the properties required (href="mailto:.../phone:")
* responsive test for contact list item name/email/phone/notes 


done### more actions
* all labels show up (contacts)
* all labels show up (label picked)
* remove from label // contact tests or here?
* delete contact // done in contact list tests
* update contact's labels



## dialogs
### contact detail 
### contact add
### contact edit 
### contact edit close
### contact delete 

### label add
// label add is already tested through databse, this is an extension of that testing to the dialog
// then unit tests will do what? Need to learn which should go where. Label tests handle the big stuff:
// add/edit/delete. Dialog e2e tests handle the dialog working, OR... should that be done in unit tests? 
// That's what we have to determine yet, i.e. e2e is better for template manipulation, but not so good for component
// testing, that's what unit tests are good for. This testing here is maybe out of place, should just be done
// in unit tests. Fine... we'll figure that out when doing the unit tests for it.

* submit disabled initially
* should show required for touched (whitespace NOT entered)
* should show required for dirty (whitespace entered)
* submit disabled if whitespace only in entry
* should show "label exists" if label exists "disregarding white space"
* should submit with no whitespace if whitespace was entered
* label exists shows if label already exists




### label edit
### label delete

### error modal
### progress bar
### page not found


todo
* dialog cancel tests
done - contact edit and contact edit close
