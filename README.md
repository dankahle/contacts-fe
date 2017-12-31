# contacts-fe

This is the angular 5/material/flex-layout frontend of the dk-contacts project. I went with global state management for global state visibility with an observable pub/sub for dealing with changes that required broadcasting to other components. Angular pulled the watches and messages from angular 1, a mistake I'm thinking. Thier html binding/input/output approach is too constraining, albeit I see the need to reduce digest churn. I found angular and material to be fairly buggy still, especially material, which has a ways to go. I had to update constantly to get the latest bug fixes (1700 for angular and 700 for material). flex-layout was easy to use once you figured out the caveats (for fxFlex, always use all three parameters), and their responsive versions terribly easy to use. It does junk up the html some, but I like that you can see where things will go in the html instead of having to run to css for it.
  
### features:  
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
 
### notable
##### ViewEncapsulation.Emulated is trying at times, ViewEncapsulation.None would be easier/faster.
Their decoration of all component html and css classes must be costly, and limits what you can do down the css line, as internal components haven't been decorated so css can't reach them. You can hit them with /deep/ but that's deprecated now, and a hack at best anyway. Material uses ViewEncapsulation.None, but that makes sense for a component library. In hindsight, I'd use ViewEncapsulated.None from now on, just easier and you don't get any brownie points by pretending to use a pretend shadowdom, the real thing nowhere in sight.

##### Material is buggy
It's not that you can't work around it with css hacks and code hacks, but then you have to pull everything out when they fix it. There needs to be much more configurability as well, as they act like they're true web components that should be isolated, yet they use ViewEncapsulation.None and global css. Hardly web components then. The shadowdom is nowhere to be found. I wonder if it will ever exist. I wonder if I would ever want it to exist anyway as the only thing that saved me on this project, was my ability to hack their component css. Without that, I couldn't have completed this project. They'd need much more configurability on their components for them to not require outside css hacks.

##### flex-layout was great
Unnecessary down the positioning line, I was already very busy in the css, a couple flex properties no big deal. But their responsive directives which worked just like their other directives were very useful. And the fact that you could see all positioning in the html instead of having to go to css to see where things landed (like old time floats), was nice. Just that it junked up the html some. I'll use flex-layout from now on. I was amazed at how I could do all my positioning with flex, not matter how intricate. Very handy for cross-axis positioning as well as main axis positioning. No more games with line-height or ghost classes to get vertical middle, no more floats to get things to go this way or that. Was a breath of fresh air. All my old css positioning tricks, no longer required.
  

