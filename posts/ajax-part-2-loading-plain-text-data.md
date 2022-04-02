---
title: 'AJAX Part 2: Loading Plain Text Data'
date: '2021-08-21'
author: 'Luke Prosser'
cover_image: 'plain-text.jpg'
image_alt: 'Picture of text in open books'
tags: ['JavaScript']
excerpt: "Now that we've discussed what AJAX is and why it came to be, let's see it in action. As AJAX enables communication between a client and a server, we need to spin up a local server in order to make requests."
draft: false
---

<style>
  info-text {
    display: block;
    background: #FDF259; 
    padding: 1rem; 
    font-size: 1rem;
  }
</style>

Now that we've discussed what AJAX is and why it came to be, let's see it in action. As AJAX enables communication between a client and a server, we need to spin up a local server in order to make requests.

<info-text>This article is the second in a series of guides all about AJAX. If you're new to AJAX check out <a href="https://www.createdeluxe.com/blog/ajax-part-1-what-is-ajax" target="_blank">AJAX Part 1: What is AJAX?</a></info-text>

Throughout the rest of this series I'll be using <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> to run the demo applications. I highly recommend VSCode as it's free, has an extensive feature set and is currently the most widely used text editor. In particular, it has a built-in easy-to-use server that we'll need in order to serve up the demo apps.

## AJAX in action

To see how things work, we'll explore some simple examples using VSCode Live Server which will serve up the files that we will be requesting. In each example, we'll build a basic page with HTML and add a script directly in the body so that you can see all of the elements at a glance.

In this guide we'll start by loading in some local plain text data. In future posts we'll go on to explore how we can load local JSON data, as well as how to communicate with an external API.

First, create a folder somewhere on your machine to store all of the various files that we'll need e.g. 'ajax-tutorial'.

## Loading plain text

We'll need a plain text file to store the text that the server will host and that our application will request. Create a file called `sample-text.txt`.

Fill it with some lorem ipsum - you can use an online generator, a VSCode extension, or alternatively feel free to simply copy the below:

```text
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam et lectus accumsan pellentesque. Fusce nibh eros, egestas ac dapibus et, tristique eget neque. Cras semper commodo sapien vel cursus. Quisque efficitur molestie nisi sed scelerisque. Proin non neque mauris. Cras laoreet massa ac ex tempor tincidunt ut sit amet est. Praesent et pretium erat. Donec mauris nibh, rutrum quis hendrerit et, pulvinar quis turpis. Pellentesque eleifend velit nec tellus commodo, eget fermentum enim mattis.
```

## HTML

Next, let's set up our first HTML file. We can call it something like `ajax-text.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AJAX 1 - Text File</title>
  </head>
  <body></body>
</html>
```

In VSCode, you can type `!` + `TAB` and a handy HTML boilerplate will be completed for you. Above you can see that I've given this document the title 'AJAX - Text File', just to keep things organised.

In order to trigger the AJAX request, we're going to need some kind of event. In the body, let's add a button that the user can click:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AJAX 1 - Text File</title>
  </head>
  <body>
    <button id="button">Get text</button>
  </body>
</html>
```

## Structuring the request logic

Next we need to consider what our script needs to do in order to capture the button trigger event, make the AJAX request and return the text data. We'll need to:

- Add an event listener to the button.
- Call a function from the event listener that will handle the request logic - we'll call it `loadText()`.
- Within `loadText()`, instantiate a new XMLHttpRequest object.
- Specify the request type and the source (i.e. the text location) in the `open()` method.
- Declare an `onload` method callback function that determines what should happen when the data is loaded.
- Declare an `onerror` method callback function to handle any network errors.
- Call the XMLHttpRequest's `send()` method to make the request.

Phew! Don't worry if any of this doesn't make sense just yet - we'll go through it line-by-line in the example.

## Adding an event listener

Let's begin by adding a script tag to hold our JavaScript code, as well as the event listener for the button:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AJAX 1 - Text File</title>
  </head>
  <body>
    <button id="button">Get text</button>

    <script>
      // Create event listener
      document.getElementById('button').addEventListener('click', loadText);
    </script>
  </body>
</html>
```

You can see that we've added a `click` event to the button and this event will call `loadText()`. Now let's declare this function and instantiate the XMLHttpRequest object. For clarity, let's just focus on the JavaScript for now:

```javascript
// Create event listener
document.getElementById('button').addEventListener('click', loadText);

function loadText() {
  // Create XHR object
  var xhr = new XMLHttpRequest();
}
```

In this case I've labelled the variable `xhr` as a simple shorthand. This short form will help as we'll be referencing it a lot!

## Opening a request

To initiate the request, we need to use the XMLHttpRequest's `open` method. This method expects three parameters:

- The request type (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- The data source (the file location or URL where the data can be accessed).
- An asynchronous flag (`true` or `false` - defaults to `true`).

The asynchronous flag determines whether or not to perform the operation asynchronously. If we pass in `true` or don't pass in an option, notification of a completed request and response will be handled using event listeners.

If we choose _not_ to make an asynchronous request i.e. `false`, the `send()` method (which we'll get to shortly!) won't return until the response is received.

In reality, there's no point worrying about a _synchronous_ use of AJAX, as it can be really bad for the user experience and has actually been deprecated by many browsers.

Ok, enough of the background, let's set that up on the next line:

```javascript
// Specify method, source, async
xhr.open('GET', 'sample-text.txt', true);
```

The `open` method will open the request and the `readyState` will update to `1` (OPENED). The `readyState` will update to `3` (LOADING) when the data is returned and downloaded successfully. If this is the case, the `readyState` should be `4` (DONE) and the response status should be `200` i.e. successful.

"Wait, what about `readyState` `2`", I hear you ask? Don't worry, we'll get to that shortly.

## Handling the response

In order to handle the response, we need to declare a callback function for the XMLHttpRequest object's `onload` method for when the request completes successfully:

```javascript
xhr.onload = function () {
  if (this.status == 200) {
    console.log(this.responseText);
  } else if (this.status == 404) {
    console.log('Data not found');
  }
};
```

We can check the status of the request using `this.status` (`this` refers to the XMLHttpRequest object.) to make sure that it returned successfully i.e. a `200` response.

<info-text>You may recall `readyState` from the first article in this series - alternatively we could check this instead. A `200` status is the equivalent to `readyState` `4`.</info-text>

That being the case, we can do something with the returned data - for now, we'll log it to the console. We can access the data using `this.responseText`.

If, for some reason, the data isn't found, we can check for this by seeing if the status is `404`.

## Network issues

In addition to problems with the data at the application level, network errors could also occur and these should be handled too. To do this, we can specify a callback for the `onerror` method:

```javascript
xhr.onerror = function () {
  console.error('Request error');
};
```

In this case we simply log an error to the console.

## Sending the request

Finally! After all that setup we're ready to send the request. We simply invoke the XMLHttpRequest's built in `send()` method at the end of the `loadText()` function:

```javascript
xhr.send();
```

## Putting it all together

Now that we've gone over all of the individual pieces, let's zoom out and take a look at the JavaScript code as a whole to put things into context:

```javascript
// Create event listener
document.getElementById('button').addEventListener('click', loadText);

function loadText() {
  // Create XHR object
  var xhr = new XMLHttpRequest();
  // Specify method, source, async
  xhr.open('GET', 'sample-text.txt', true);
  // onload doesn't run until httpRequest.readyState is 4
  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);
    } else if (this.status == 404) {
      console.log('Data not found');
    }
  };

  // onerror fires if issue at the network (not application) level
  xhr.onerror = function () {
    console.error('Request error');
  };

  // Send request
  xhr.send();
}
```

To recap, you can see that:

- The XMLHttpRequest object is instantiated.
- The request is opened.
- The `onload` callback function is defined where the main logic takes place.
- The `onerror` callback function is defined to handle network issues.
- The request is sent via the XMLHttpRequest object's `send` method.

## Running the code

We have all of the code in place, now let's run it! To do this we'll need to spin up a server using VSCode's handy built-in Live Server. Right click anywhere in the HTML file and select 'Open with Live Server'. This will open the application in your default browser.

![App loaded](./app-loaded.png 'App loaded')

Open up the developer console, then click on the 'Get text' button. You should see the `responseText` logged to the console output!

The request accessed the `sample-text.txt` file on the local server, stored the contents on `this.responseText` and logged the output.

If you received the 'Not found' error, check that everything is set up correctly and that your text file has the correct filename.

## UI feedback

We've proved that our application logic is working and that the AJAX request is sending successfully, but it would be helpful to provide the user with some visual feedback by displaying the fetched text on screen.

To achieve this, we're going to need an element in the HTML that can output the text. Let's add a paragraph tag with the ID `text-output`:

```html
<button id="button">Get text</button>
<p id="text-output"></p>
```

Note that the `<p>` tag is empty for now. Next we'll need a way to access this tag in the JavaScript code. We can store it in a variable immediately after the button event listener:

```javascript
// Create event listener
document.getElementById('button').addEventListener('click', loadText);
// Get paragraph tag
var text = document.getElementById('text-output');
```

Finally, rather than logging the `responseText` to the console in the `onload` callback, we can render it inside the paragraph tag by setting its `innerText` property:

```javascript
httpRequest.onload = function () {
  if (this.status == 200) {
    text.innerText = this.responseText;
  } else if (this.status == 404) {
    text.innerText = 'Not found';
  }
};
```

You can see that we set the paragraph element's `innerText` property equal to `this.responseText`. Now when we click the button, the text is rendered to the UI!

![Text response](./text-response.png 'Text response')

Now that our work is complete, if you want to stop the server, simply right-click the HTML document again and select 'Stop Live Server'.

## Next steps

In this lesson we learned how to load plain text data with AJAX. Hopefully the syntax is beginning to make sense but, if not, fear not! There will be plenty more opportunity to practice throughout the rest of the series.

In <a href="https://www.createdeluxe.com/blog/ajax-part-3-loading-json-data" target="_blank">AJAX Part 3: Loading JSON Data</a>, we'll iterate on our demo application to load JSON data from a local server.
