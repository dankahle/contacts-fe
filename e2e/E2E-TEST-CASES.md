
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

done ### labels
* accordion works for labels/extras
* default (contacts) shows all contacts, label two shows 2, label three shows none
* create label // dialog
* edit label // dialog
* delete label no contacts deletes
* delete label with contacts keep contacts // dialog
* delete label with contacts toss contacts // dialog

### contact list
* responsive: notes, phone, email disappear at appropriate breakpoints
*  in label tests - shows appropriate contacts for contactsLabel and other labels
*  shows no contacts when label zthree is picked
*  add contact brings up edit dialog
*  click on contact brings up appropriate detail dialog
* >edit icon click brings up edit dialog
*  delete icon click brings up contact delete dialog
* contact list item shows all fields for xl
* clicking on link spawns new tab in browser, or maybe just check it's a link with the properties required (href="mailto:.../phone:")

 
### contact list item
you'd think this could be covered in contact list, but not sure what should be done in e2e as opposed to comp tests. 


### more actions
* all labels show up
* remove from label if label is active
* delete contact

## dialogs
### contact detail 
### contact add
### contact edit 
### contact edit close
### contact delete 
### label add
* submit enabled/disabled on trimmed input
* required shows for no text // trimmed or will space work?
* label exists shows if label already exists
* cancel doesn't create label
* submit creates new label

### label edit
### label delete

### error modal
### progress bar
### page not found


todo
* need tests for case insensitive ordering of labels and contacts. you're tests broke in be when you went with pascal case
for brenda, jane, martha, BUT NOT FOR KATE, so must be broken in list then? Maybe it's fine in db get but when you add you don't sort locally? (probably)
but either way... shouldn't be broken in test right? Maybe put jane lower case so it gets tested in be as well as fe? No, just add a new one with diff case and make 
sure it lands in correct position (like you do with labels)

* all your dialog tests just test submit button. What about cancel?? Hmm. Maybe jsut do cancel before submit, check no change, then do submit?

