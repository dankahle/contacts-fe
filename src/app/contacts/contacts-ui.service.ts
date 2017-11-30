import {Injectable} from '@angular/core';


/**
 * ContactsUiService
 * @desc - we have a hierarchy of: store/routing << core << shared << comps << app
 * we'd like to put as much functionality in the services as possible, but always turns into a mess when
 * they need to "see" each other, the dreaded cyclic dependency issue. So we'll create services in the pages to answer
 * those issues. Some things would be more appropriate in the core (update labels on user), but if the userService needs
 * to user another service, then it gets bumped up to this level that can see core without concern of cyclic dependency.
 */
@Injectable()
export class ContactsUiService {
}
