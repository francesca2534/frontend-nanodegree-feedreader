/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
   });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('hidden by default', function() {
            /*Menu element is visible only when menuIcon is clicked.
             *When menuIcon is clicked the 'menu-hidden' class gets toggled. (app.js 131-133)
             *So check whether the body has class 'menu-hidden' initially.
             */
            expect($ ('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility', function() {
            /*When the menuIcon is clicked the 'menu-hidden' class gets toggled. 
             *So check whether the menu-hidden class is present after the click.
             */
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */       
        beforeEach(function(done) {
            loadFeed(0, done);       
        })

        it('at least single element', function() {
            /*The '.feed' container should contain one '.entry' element. 
             */
            expect($('.feed .entry-link .entry')).toBeDefined();
        });
    });

    /* Test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function the content actually changes.
         * loadFeed() is asynchronous.
         */    
        var oldText, newText;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldText = $('.feed .entry h2').html();
                loadFeed(1, function() {
                    var newText = $('.feed .entry h2').html();
                    done();
                });
            });
        });
        
        /*Check whether the oldText and newText are same.
         */
        it('content changes', function(done) {
            expect(oldText).not.toBe(newText);
            done();
        });
    });    

}());
