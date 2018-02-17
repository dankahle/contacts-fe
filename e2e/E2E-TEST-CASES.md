
done### app
* should land at root
* title should be DkContacts
* should redirect to root if label not found

done### contact list
* should show no contacts view when label zthree is selected
* should NOT add Karla (no entry cancel)
* should NOT add Karla (entry cancel >> close submit)
* should add Karla, cancel, cancel close dialog, then submit
* should delete Karla
* should add then delete Karla
* should bring up detail dialog when clicked on
* should edit name
* should bring up email and phone windows when clicked on
* should show correct columns per breakpoint

done### more actions
done##### contact list item
* should show all options (label contacts)
* should show all options (label two)
* should delete jane (contacts)
* should delete jane (label two)
* should remove jane from label two
* should remove jane from label two and add to label zthree

done##### contact details dialog
* should show all options (label contacts)
* should show all options (label two)
* should delete jane (contacts)
* should delete jane (label two)
* should remove jane from label two
* should remove jane from label two and add to label zthree

done### search
* should show clear icon when input has text
* should clear the text
* should set focus to input when you click on search icon
* should set focus to input when you click on search icon - switchTo().activeElement()
* should have Brenda/jane/Martha Co for "a"
* should only have jane for "j", then nothing for backspace
* should have Brenda/jane for "n"
* should have Brenda/jane for "n" (in label three view)
* should search for Brenda/jane and open jane detail

 done### labels
* should open/close accordion sections
* should default to contacts label, and show correct contacts for chosen labels
* should create label and delete it with no contacts
* should edit label
* should show the correct number of contacts in parenthesis (x)
* should do nothing if delete cancelled
* should delete label two and keep contacts (in contacts)
* should delete label two and keep contacts (in label one)
* should delete label two and keep contacts (in label two)
* should delete label two and toss contacts (in contacts)
* should delete label two and toss contacts (in label one)
* should delete label two and toss contacts (in label two)

done### leftnav
* should show and hide on breakpoints
* should open and close with header button (md/lg/xl)
* should open and close with header button (xs/sm)
* should close on lt-md and reopen md
* should stay closed when closed gt-sm, then lt-md, then gt-sm

done### label add
* should show no errors originally
* should disable submit initially
* input should have focus on entry
* should show required message for touched
* should show required for dirty
* should show required for dirty (whitespace entered)
* should show "label exists" if label exists with/without white space
* should submit with no whitespace if whitespace was entered

done### label edit
* should show no errors originally
* should enable submit initially
* input should have focus on entry
* should show "label exists" if label exists with/without white space
* should NOT show "label exists" if label is "label two" with/without whitespace
* should submit with no whitespace if whitespace was entered

done### label delete
* should default to keep contacts

done### contact detail
* should close by close button
* should go down by body click
* should show name and/or company for title
* should show "jobTitle, company" or "company"
* should show nothing if jobTitle, but no company
* should show all fields on entry (with/without label)
* should show only title if nothing else entered
* should show correct label chips
* should open edit on edit click, and take down both on edit close
* should open new windows for email/phone/addr/website click

### contact edit (add) 

### contact edit (add) 
 * should go down by body click (nothing changed)
 * should go down by cancel click (nothing changed)
 * should bring up contact delete on cancel if data changed
 * should bring up contact delete on body click if data changed
* should do nothing on cancel // set a name, then cancel and verify name didn't change
* should show error if no name or company (touched)
* should show error if no name or company (dirty)
* should show error if no name or company (submit)
* should show all fields, and have no data
* should update all fields when submitted and reopened

### contact edit (edit) 
* should go down by body click (nothing changed)
* should go down by cancel click (nothing changed)
* should bring up contact delete on cancel if data changed
* should bring up contact delete on body click if data changed
* should do nothing on cancel // set a name, then cancel and verify name didn't change
* should show error if no name or company (touched)
* should show error if no name or company (dirty)
* should show error if no name or company (submit)
* should set all fields on entry
* should update all fields when submitted and reopened


## dialogs
### contact add
### contact edit 
### contact edit close
### contact delete 


### error dialog
### progress bar
### page not found


todo
* dialog cancel tests
done - contact edit and contact edit close
