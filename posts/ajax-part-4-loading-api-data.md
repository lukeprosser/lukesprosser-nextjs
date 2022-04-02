---
title: 'AJAX Part 4: Loading Data From An External API'
date: '2021-09-04'
author: 'Luke Prosser'
cover_image: 'api.jpg'
image_alt: 'Picture of data on a dashboard UI'
tags: ['JavaScript']
excerpt: "In the previous article we discovered how to load JSON data from a local server using AJAX. In this instalment, we'll explore a more practical example where we'll fetch JSON data from an external API."
draft: false
---

Welcome to the fourth and final article in this series all about AJAX. If you haven't read the other three guides I recommend starting with <a href="https://www.createdeluxe.com/blog/ajax-part-1-what-is-ajax" target="_blank">AJAX Part 1: What is AJAX?</a>.

In the <a href="https://www.createdeluxe.com/blog/ajax-part-3-loading-json-data" target="_blank">previous article</a> we discovered how to load JSON data from a local server using AJAX. In this instalment, we'll explore a more practical example where we'll fetch JSON data from an external API.

In this case, we'll use the GitHub API to load a list of GitHub users.

<p style="background: #FDF259; padding: 1rem; font-size: 1rem;">Just a reminder that throughout this series I'm using Visual Studio Code as my text editor. It has a handy feature called 'Live Server' that we'll be using to serve up the demo application.</p>

## HTML

Once again, let's get started with the HTML. Similar to the previous guide, we'll need a button with an event listener to trigger the request. This time we can call the file something like `ajax-external-json.html`, with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AJAX 3 - External API</title>
    <style></style>
  </head>
  <body>
    <button id="button">Load GitHub users</button>
    <br /><br />
    <h2>GitHub Users</h2>
    <div id="users"></div>
  </body>
</html>
```

Once again, feel free to add a title to distinguish this file from previous work. In this above example I've labelled the document 'AJAX 3 - External API', as this is the third demo app that we'll be building.

Note that we have a button that will eventually trigger the AJAX request, as well as a `<div>` with the ID `users` that will be used to display the returned user data.

## Adding the event listener

Let's create a `<script>` tag and add the event listener and set the callback to a function called `loadUsers`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AJAX 3 - External API</title>
    <style></style>
  </head>
  <body>
    <button id="button">Load GitHub users</button>
    <br /><br />
    <h2>GitHub Users</h2>
    <div id="users"></div>
    <script>
      document.getElementById('button').addEventListener('click', loadUsers);

      function loadUsers() {}
    </script>
  </body>
</html>
```

## Stub out loadUsers

We can also initialise the XMLHttpRequest object and open a `GET` request to the GitHub API endpoint:

```javascript
function loadUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/users', true);
}
```

While we're here, let's stub out the rest of the function:

```javascript
function loadUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/users', true);

  xhr.onload = function () {};

  xhr.onerror = function () {
    console.error('Request error');
  };

  xhr.send();
}
```

## onload logic

The main business logic will all be handled in the `onload` callback. Here we'll need to:

- Parse the returned JSON response as text.
- Initialise an empty `userInfo` variable that will hold all of the user information.
- Loop through the returned user data and build up a `<div>` that will display the user's avatar image, ID and username.
- Set the `innerHTML` of the `users` `<div>` to be the content of the `userInfo` variable.

We'll focus solely on the `onload` callback for clarity. First let's check the HTTP status, parse the response JSON and initialise the `userInfo` variable:

```javascript
xhr.onload = function () {
  if (this.status == 200) {
    const users = JSON.parse(this.responseText);

    let userInfo = ``;
  }
};
```

Notice that I've used backticks for the `userInfo` string as we'll be building this up using template strings.

## Building up userInfo

Now let's use a `for` loop to iterate through each of the returned GitHub user profiles and build up the template string with their information.

This will include a containing `<div>` for each user, an `<img>` to display their profile image, and a `<ul>` to list the user's ID and username.

```javascript
let userInfo = ``;

for (let i = 0; i < users.length; i++) {
  userInfo += `<div class="user">
	    <img src="${users[i].avatar_url}" width="70" height="70">
      <ul>
	      <li>ID: ${users[i].id}</li>
        <li>Login: ${users[i].login}</li>
      </ul>
	  </div>`;
}
```

Finally, we just need to grab the `<div>` with ID `users` and set the `innerHTML` content equal to that of the `userInfo` variable:

```javascript
document.getElementById('users').innerHTML = userInfo;
```

Take care to note that this is performed outside of the loop!

## Check your work

Here's the full code for comparison, including the HTML and JavaScript. I've also added a little CSS to the `<head>` to help visually separate each user:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AJAX 3 - External API</title>
    <style>
      .user {
        display: flex;
        background: lightblue;
        padding: 10px;
        margin-bottom: 10px;
      }

      .user ul {
        list-style: none;
      }
    </style>
  </head>
  <body>
    <button id="button">Load GitHub users</button>
    <br /><br />
    <h2>GitHub Users</h2>
    <div id="users"></div>
    <script>
      document.getElementById('button').addEventListener('click', loadUsers);

      function loadUsers() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users', true);

        xhr.onload = function () {
          if (this.status == 200) {
            const users = JSON.parse(this.responseText);
            let userInfo = ``;

            for (let i = 0; i < users.length; i++) {
              userInfo += `<div class="user">
							    <img src="${users[i].avatar_url}" width="70" height="70">
						      <ul>
							      <li>ID: ${users[i].id}</li>
						        <li>Login: ${users[i].login}</li>
						      </ul>
							  </div>`;
            }

            document.getElementById('users').innerHTML = userInfo;
          }
        };

        xhr.onerror = function () {
          console.error('Request error');
        };

        xhr.send();
      }
    </script>
  </body>
</html>
```

## Testing the app

To start up the code and test things out, right-click anywhere in the file and select 'Open with Live Server'. The app should open in your default browser.

Click the 'Load GitHub users' button to see if the users are being loaded from the GitHub API successfully. If everything has gone to plan you should see something like this:

![GitHub users displayed](./github-users-displayed.png 'GitHub users displayed')

If nothing seems to happen, check the developer console in your browser to see if any errors have been logged. Go back over the code line by line and check that everything is in place correctly.

When you're finished, remember to right-click the HTML file once more and select 'Stop Live Server' to shut the server down.

## Conclusion

Congratulations! You made it to the end of this series on AJAX and built three demo applications to demonstrate various ways of working with it. Hopefully this has painted a clearer picture of the benefits of AJAX and inspired some ideas about how to use it in your own projects going forward.

If you're still unclear on any of the theory behind AJAX, be sure to head back to the first article in the series <a href="https://www.createdeluxe.com/blog/ajax-part-1-what-is-ajax" target="_blank">AJAX Part 1: What is AJAX?</a> to have another read. Asynchronous JavaScript can seem pretty strange at first, so don't worry if it takes a while for these concepts to settle in.

## Next steps

AJAX can have many uses and solve all sorts of problems. One major implementation is in submitting form information for a smoother user experience.

This is quite a large topic and is unfortunately out of the scope of this series. For details on how AJAX works with forms, check out the <a href="https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript" target="_blank">MDN documentation</a>.
