# redis-proxy
redis proxy assignment. you can find more specific [details in this doc](https://paper.dropbox.com/doc/Redis-Proxy-Candidate-Brief-ToMoukffX9OvFXAXhH6fl). 


# High Level Architecture
Starting out in the root directory. My goal was to keep this project functional with isolated components or methods that take very specific actions. My thinking is that this will make the project more readable, make isolating an issue easier, and will allow other to easily build on the initial layout. 

My app follows this structure:

root/
  index.js   - main app logic
  memory.js  - in memory cache data strucutre with helper methods
  utils.js   - methods that might be used in multiple files
  server/    
    index.js - start the server 
  test/
    index.js - run tests

# How The Code Works

First, make sure you checkout the **Run The Code** section with how to run and use the proxy. Assuming you pass a `stringId` as described the proxy will handle and hash the `stringId`. Redis required a `client.set("string key", "string val")` `key` and a `value`. I could have handled those values from the url in a few ways, but I choose to handle a value and create a unique key in the app logic. I can explain my thinking for this decision. At this point we check if that key exisits in the local cache. If it does, I return it. If it does not, I check if it exists in redis. If it does, then I set it in the local cache. Then I return the `value` from the local cache.  

# Algorithmic Complexity

If it was a straight insertion and access command the complexity would be as follows:

Insertion is 0(1)

LookUp is 0(1)

# Run The Code

From the root directoy, `make run` will set up the proxy locally. `make run` will force `npm install` before running the app. This is just in case you don't have all the required dependecies. This will run the app using default config options.

Once running, visit `localhost:3000/` in your browser. I did not define a route for `/` so you will likely see an error. For the app to work you must pass a `value` or argument. So `localhost:3000/{stringId}`. 

`localhost:3000/hello`
`localhost:3000/goodbye`

In the app, that string will become the value and I will use a hash function to assign a unique key to each value passed into the app. No specific instruction were given on where to return the values so I just returned them with `res.json()`. **Note**: There are certain assumptions I made when building this proxy that are documented with internal notes. 

If you would prefer to configure the proxy at startup then you have the option to pass `port`, `host`, `cacheSize`, and `globalExpries` as arguments to the proxy. **Note:** If you pass config options you must pass all four argument in a very specific order. 

1st argument: port - port where the the proxy listens
2nd argument: host - address of the redis backing
3rd argument: cacheSize - cache size limit
4th argument: globalExpires - cache expiry time

In your terminal, from the command line, this might look like this:

`node index.js 6379 '127.0.0.1' 5 20000`

# Time Spent

I received this assignment Monday end of the day. I had never worked with many of the technologies. I definitely spent quite a bit of upfront time doing tutorials with redis and wrapping my head around what the project is asking for. Upfront time: 2 Hours

Once I had designed the architecture and layout I worked through most of the logic bits. Logic, testing, and making it work together: 4 Hours

Config Options: 1 Hour

Platform: 30 minutes

Overall: About 8 Hours.

Considerations: Much of this work has been done end of day after work not getting my best mental processing ability. I definitely found myself introducing bugs or struggling with wht I felt were easy changes. I also have not actively been programming so I did come up to speed on many of the requirements quickly.

# Requirements Not Implemented 

Tests - I do plan to do this, but it will require a bit more work/time. 
Sequnetial Concurrent Processing - Did not research too deeply and chose to omit due to time constraints.
LRU eviction - Researched but did not implement due to time constraints.

