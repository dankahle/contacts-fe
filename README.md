# contacts-fe

This is the angular 5/material/flex-layout frontend of the dk-contacts project. It utilizes the lastest angular/material frameworks. 
  
###features:  
* page based architecture that localizes all services/components/etc involved with a specific site section.
* core and shared directories for common services/components
* Angular Material components and theme
* ViewEncapsulation.Emulated mode (although ViewEncapsulation.None may have worked better (what material uses))
* responsive from portrait thru widescreen
* heavy scss usage to keep html clean
* @angular/flex-layout for all layout (no tables or floats, all flex)
* @anglar/flex-layout responsive directives for responsiveness 
* custom breakpoint service extending flex-layout's ObservableMedia service to include lastBreakpoint, an oversight on their part. You need to know where you're coming from, not just where you are. Coming from md to sm? close the menu. I.e. don't want to close the menu going form xs to sm, only md/lg/xl >> sm. Need the lastBreakpoint for these decisions
* separate dev and prod config files
* error dialog for all api errors with json section for additional data
* synchronized errorcodes between node-base and UI for custom error messages
* ajax progress bar across the top, that can be turned off/on with params
* HttpClient interceptors for ajax progress, errors, CORS header addition
* httpOnly cookie based security, session or extended using backend authentication and cookie handling
* login/register pages with a splash front for nicer entry
* global state manager (Store) that presents a pub/sub interface for global data, with separate pub/sub for individual properties for less code churn. Also Substore sections that would go with site sections or pages, to keep things compartmentalized. Message emit/sub interface.
* 3 stage initialization where parallel ajax gets wait till all arrive, then do another set of gets and wait, then do another set of gets and wait, then initialize the app. This affords complicated initialization protocols where async data is required to get other async data (been there before).
* improvements on the ux: less fields and all at once, no detail dialog after edit dialog, validation on emails, required name or company, better add/remove icon show/hide action for emails, phones etc
* angular routing with 3-stage guard (auth/init/page) and resolves
* unsubscription to all temporary observable subscriptions
* hierarchical architecture to reduce cyclic redundancy: store >> routing >> core services >> shared components >> page components/services
* cyclical dependency solution for impossible cyclic redundancy situations (messaging or pub/sub)
* custom ErrorStateMatcher for better material form ux
* custom form validation
* enter key form submission with keydown filter for better ux
* all icons wrapped in padded divs to make it easier to hit and show tooltips
* all scss is me, all positioning (flex) is me. I took the liberty to steal some colors, padding and margins, that's it. I enjoy css challenges. All that can be done in css is done in css, javascript (jquery) isn't used for positioning.
* karma/jasmine unit testing
* github pages hosting
 

  

