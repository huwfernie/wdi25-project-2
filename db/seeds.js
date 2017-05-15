const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Trip = require('../models/trip');

User.collection.drop();
Trip.collection.drop();


User
  .create([{
    username: 'Huw',
    email: 'h@h',
    password: 'p',
    passwordConfirmation: 'p',
    imageProfile: 'https://avatars0.githubusercontent.com/u/23502265?v=3&u=7f6f9075b2e008ac5c3b5aefbe5ee4df2a502956&s=400',
    imageHero: 'http://media.bizj.us/view/img/9307902/aaaaboat1*750xx2448-1377-0-536.jpg',
    nearestAirport: 'London',
    favourites: [],
    bio: 'I used to be a sailor, now I am a web developer, it is fun',
    githubId: null
  }, {
    username: 'Roser',
    email: 'r@r',
    password: 'p',
    passwordConfirmation: 'p',
    imageProfile: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/085/189/10526f6.jpg',
    imageHero: 'https://i2.wp.com/segelreporter.com/wp-content/uploads/2014/07/Arti_Roser.jpg?fit=640%2C300',
    nearestAirport: 'London',
    favourites: [],
    bio: 'I used to be a sailor, now I am not, it is also fun',
    githubId: null
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Trip
      .create([{
        title: 'Huws summer motorbike trip',
        words: `They say driving Route 66, the iconic 2,400-mile road connecting Chicago with Santa Monica, sneaks us into a bygone America, an era of neon signs and mom-and-pop diners. This waits for us, just off the interstate. Right?

That may be true about the route, but that's not the only reason to take it.

"It's [more than] nostalgia, '57 Chevys, and James Dean," says Michael Wallis, a Route 66 lifer and author of Route 66: The Mother Road, which helped spark a 66 renaissance in the '90s.

"The real adventure is that it's unpredictable. There's this feeling of excitement, of almost danger that you can't get on the interstates," Wallis tells me by phone from his home in Tulsa, where he can see Route 66 from his window. "You go into some greasy spoon and [don't] know what you're going to get."

Often that's a bond made with the folks you meet. Or just finding the pie of a lifetime.

From the get-go of its opening in 1926, Route 66 has been a celebrity. Other highways crossed the country too, but only the "Main Street of America" had John Steinbeck's attention (with The Grapes of Wrath), an iconic soundtrack—"(Get Your Kicks on) Route 66"—and the ability to continue winning new hearts (via Pixar's Cars).

You can see how it earned its star status if you take it slow rather than "scoot and shoot" (local parlance for snapping photos from car windows and zooming off). The full trip, which winds on and off five interstates, requires at least two weeks. If you have less time, consider cherry-picking some areas to explore.`,
        when: 'summer', // Summer or Winter
        where: 'USA',
        who: { adults: 2, children: 0 },
        how: 'Motorbike',
        for: 3, // of days
        createdBy: users[0],
        authorImage: null, //users[0].authorImage,
        legs: null,//[ legSchema ],
        lat: 35.2,
        long: -112.1,
        imageHero: 'http://d56b293rhv8dp.cloudfront.net/experience_page_images/110/images/original/1.jpg?1487186156',
        imageGallery: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ10QOYplI0tLrdP6lc80m7GfpB2TSvo3YgbDQaKylDEQLG9YB','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoT94t-m_WpEaRfjuZkfm5iyXob5Yc43kgcpxomcZO3ulh5x3JKw']
      }, {
        title: 'Huws Winter Markdown Trip',
        words: `An h1 header
============

Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and \`monospace\`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.

Tables can look like this:

size  material      color
----  ------------  ------------
9     leather       brown
10    hemp canvas   natural
11    glass         transparent

Table: Shoes, their sizes, and what they're made of

(The above is the caption for the table.) Pandoc also supports
multi-line tables:

--------  -----------------------
keyword   text
--------  -----------------------
red       Sunsets, apples, and
          other red or reddish
          things.

green     Leaves, grass, frogs
          and other things it's
          not easy being.
--------  -----------------------

A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](example-image.jpg "An exemplary image")

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.`,
        when: 'winter', // Summer or Winter
        where: 'Equator',
        who: { adults: 2, children: 0 },
        how: 'boat',
        for: 2, // of days
        createdBy: users[0],
        authorImage: null, //users[0].authorImage,
        legs: null,//[ legSchema ],
        lat: 0,
        long: -78.1,
        imageHero: 'https://media.timeout.com/images/101651783/image.jpg',
        imageGallery: []
      }, {
        title: 'Rosers Summer Austria Trip',
        words: `Once in a while when you're travelling you come across a place you could happily call your home. For me I found this with Austria.

The country is full of beautiful lakes containing crystal clear water, which runs off the mountains. This makes them a prime attraction for tourists and they are surrounded with cultured Austrian towns and cute bars and restaurants sitting next to or over the lake. Being a lover of water myself I just travelled from one lake to another on my way through from Germany to Slovenia. Albeit, they can get very busy you can also find yourself some beautiful spots just for yourself. Like here at the Traunsee Lake where I had a 'bath' next to a willow tree, or at Haltsee lake.

The lakes are also perfect for water sports of different kinds: paddle boarding, kite surfing, kayaking and fishing. For me it's inspired me to try kite surfing at some point, imagine kite surfing here!

The culture of Austria is another thing which I love about the country, many walk around in Austrian outfits without a need for an occasion; the men wear the typical lederhosen outfit and women wear dirndl dresses. Every body is very friendly and welcoming, they actually want to talk to the tourists and find out why you are here. The beer is also incredible (might explain why there was so many drunk kids everywhere) and sitting next to a lake with a pint of Austrian's finest is a good way to pass the time...

When you walk through the little villages and towns their culture thrives all around you routed wishing farming, ceramics, religion and mining this can be seen in the beauty of the houses and streets. You will often come across random religious statues and ornaments in the street showing Jesus on the cross. realistically recreated with intestines popping out of where a long would be on the sculpture. The houses are well kept and you can see that the owners take pride in their houses.

On a weekend their culture thrives even more. Saturday and Sunday sees them set up market stalls and sell their traditional pastries and pretzels. Which I was more than happy to have a little taste test of and yes they are incredible! The pretzel van impressed me the most looking rather holy with the sun behind me, I felt like god was telling me to have a pretzel so of course I obliged...

Austrian Pastries Dried meat The holy pretzel stand One more thing which I love about Austria is watching the sunset over the lakes and mountains and the beautiful views. I will just let you check the pictures out so see why, no need to ramble on!

Traunsee Lake Faaker See lake Traunsee Lake Traunsee Lake Worthesee Lake Austrian river When I started writing my love story of Austria it grew, as I travelled I found more parts of Austria that I fell in love with bit by bit. So my love story escalated from wanting to revisit a few lakes to know wanting to explore the whole country, I may be a romantic at heart, who knows? Although I do happen to fall in love with every country I go to and leave, most of the time, with the decision that I could totally live there. For me, Austria it is out doing all countries I've visited so far! Taking some big guns out in the process including: Norway, Denmark, Sweden and Holland! Lets see how Slovenia and Croatia do....`,
        when: 'summer', // Summer or Winter
        where: 'Austria',
        who: { adults: 2, children: 0 },
        how: 'Hike',
        for: 2, // of days
        createdBy: users[1],
        authorImage: null, //users[0].authorImage,
        legs: null,//[ legSchema ],
        lat: 51.5,
        long: -0.12,
        imageHero: 'https://media1.britannica.com/eb-media/20/191120-004-AD2A2694.jpg',
        imageGallery: ['http://adventurouskate.smugmug.com/Travel/Innsbruck-August-2010/i-4JnDLL4/0/M/IMG4493-M.jpg','https://blog.travelcenter.uk/wp-content/uploads/2016/05/Top-Rated-Tourist-Attractions-in-Austria-Travel-Center-UK-Blog-e1461586449471-821x400.jpg']
      }, {
        title: 'Rosers Winter Kayak Trip',
        words: `The Svartisen glacier is the second largest in Norway and the lowest in Europe making it easy(ish) to get to. Well if you're a normal person who decides to pay to get on the boat over there instead of kayak then it's probably easier. Being the stingy travellers we are and with the budget we are on there was absolutely no way the boat was being used.

The kayak over probably took us about an hour this was more because:

1. George was making deep and meaningful videos where she likes to share her life views in them.


2.  I was seeing if I could pick the jelly fish up with my kayak paddle...



3. We could not resist the photo opportunity!





The climb up to the glacier was incredible. There were cracks within the rocks where waterfalls flowed and a scenic view of the fjord and lake behind me. In any normal country this would have been what people were here to look at. Norway is not a normal country. Everyone was here for the glacier. Hikers young to old, families, groups or solo were all on a mission to touch that glacier. Well that was my number 1 mission. Turning the corner around a rock and being at the bottom of the glacier was awe inspiring and overwhelming. I dealt with it in the most British way. Standing there by myself a tiny little spec at the bottom of a 4 meter thick, never ending in length glacier out loud I just repeated the words "Oh my" to my self in every possible way. "Oh my, oh my" was definitely my favourite. It was both excitement and fear because I couldn't stop imagining what would happen if the ice were too start sliding towards me.

Underneath Svartisen Glacier
Climbing Svartisen Glacier
The fear didn't stop me from climbing up underneath and standing within an ice cave at the foot where the melted water gathered within a river and a waterfall fell from underneath it. It was beautiful. The blue from where the sun shone through the ice was so deep and bright and the water so clear but yet so powerful. Even when you left the foot of the glacier and climbed up the side you could still here the water rushing down to the bottom. For me touching the glacier was a very weird experience. I imagined it to be smooth and one massive conjoined piece of ice. The underneath were the water was melting off was but the top was rough in texture. A glacier is practically million ice cubes stuck together. It reminded me of when you buy a bag of ice from the supermarket but it's all moulded together. It was defiantly not what I expected.

The whole of the glacier trip was unexpected. We had no idea there was a glacier on the road we had decided to drive on in the first place so it added to 'this was meant to be' feeling. Honestly that's one thing about travelling I love you never seem to know what is around the corner and what will happen to you. On the way back to the kayaks I also came across blueberry bushes everywhere so I used my empty water bottle and spent a good hour picking blueberries. When we finally got back to the van for the night we were knackered but it was well worth it.

One thing I wish I had the chance to do that day was to walk on the glacier. As I was leaving a group who were on the tour returned. This has defiantly been added to my bucket list! `,
        when: 'winter', // Summer or Winter
        where: 'Norway',
        who: { adults: 2, children: 0 },
        how: 'Kayak',
        for: 2, // of days
        createdBy: users[1],
        authorImage: null, //users[0].authorImage,
        legs: null,//[ legSchema ],
        lat: 58.4,
        long: 8.27,
        imageHero: 'http://wilderness.neolab.no/wp-content/themes/wilderness/assets/img/bigfront.jpg',
        imageGallery: ['https://static.wixstatic.com/media/26cb45_d1ce602fd3054daaaa87f6a0f19cd28e~mv2_d_4032_3024_s_4_2.jpg/v1/fill/w_871,h_653,al_c,q_90,usm_2.00_1.00_0.00/26cb45_d1ce602fd3054daaaa87f6a0f19cd28e~mv2_d_4032_3024_s_4_2.webp', 'https://static.wixstatic.com/media/26cb45_e4c9d0528b484f00a3a0161f03329c6b~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_490,h_653,al_c,q_90,usm_2.00_1.00_0.00/26cb45_e4c9d0528b484f00a3a0161f03329c6b~mv2_d_3024_4032_s_4_2.webp']
      }]);
  })
  .then((trips) => {
    console.log(`${trips.length} trips created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
