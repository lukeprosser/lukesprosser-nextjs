---
title: 'SQL Functions: Aggregating Data'
date: '2019-07-27'
author: 'Luke Prosser'
cover_image: 'aggregate-data.jpg'
image_alt: 'Picture of data on a graph'
tags: ['SQL']
excerpt: 'Aggregate functions provide us with more tools to combine and analyse our data in meaningful ways. These include finding averages, counting, and summing based on grouping data together.'
draft: false
---

Aggregate functions provide us with more tools to combine and analyse our data in meaningful ways. These include finding averages, counting, and summing based on grouping data together.

The functions outlined in this post are known as _aggregate functions_ because they work on aggregated data. Make sense so far? Let’s look at some examples to illustrate.

<!-- If you haven’t already checked out the previous posts in this series, check out SQL Foundations: [part 1] -->

## The data

For the purposes of these examples, let’s pretend we’ve created a table called ‘books' to keep track of our reading:

| book_id | title                 | auth_fname | auth_lname | published | pages |
| ------- | --------------------- | ---------- | ---------- | --------- | ----- |
| 1       | The Alchemist         | Paulo      | Coehlo     | 1988      | 161   |
| 2       | Dune                  | Frank      | Herbert    | 1966      | 577   |
| 3       | Deep Work             | Cal        | Newport    | 2016      | 296   |
| 4       | War God               | Graham     | Hancock    | 2013      | 551   |
| 5       | 12 Rules For Life     | Jordan     | Peterson   | 2018      | 320   |
| 6       | Magicians Of The Gods | Graham     | Hancock    | 2016      | 591   |

## COUNT

_COUNT()_ returns the number of rows that match specified criteria. There are 7 entries in the ’books’ table, so the following query will return 7 (i.e. the total number of items in the table):

```sql
SELECT COUNT(*) FROM books;

Returns:
7
```

Getting more specific, what if we wanted to know how many authors were in our table?

```sql
SELECT COUNT(auth_fname) FROM books;

Returns:
7
```

Note that _this also returns 7_, even though there are two books by Graham Hancock. As mentioned, COUNT() adds up all instances of the data queried. To find out how many unique authors are in the table, we can use our old friend _DISTINCT()_:

```sql
SELECT COUNT(DISTINCT auth_fname) FROM sales;

Returns:
6
```

This now produces the desired result, as there are 6 different authors in total.

COUNT() can also be used in combination with operators, such as _LIKE_:

```sql
SELECT COUNT(*) FROM books WHERE auth_fname LIKE ‘%Cal%’;

Returns:
1
```

## GROUP BY

_GROUP BY_ summarises or aggregates identical data into single rows. Essentially, it will group rows that have the same value into ’summary’ or ’super’ rows.

GROUP BY can be used alongside aggregate functions to group the result-set by one or more columns. It’s a little tricky to explain, so let’s look at some examples.

Suppose we want to find out how many books we have read by each author. We can display _author first name_ in one column, the _count_ in another, and group by the number of _author last names_:

```sql
SELECT auth_lname, COUNT(*) FROM books GROUP BY auth_lname;

Returns:

auth_lname  COUNT(*)
--------------------
Cialdini    1
Coehlo      1
Hancock     2
Herbert     1
Newport     1
Peterson    1
```

Another example of a query that would make use of this might be ‘Find the number of books published for each published year’:

```sql
SELECT published, COUNT(*) FROM books GROUP BY published;

Returns:

published   COUNT(*)
--------------------
1966        1
1984        1
1988        1
2013        1
2016        2
2018        1
```

Here you can see that 2 books were published in 2016.

## MIN & MAX

_MIN()_ & _MAX()_ are pretty self explanatory. They will produce the minimum (smallest) or maximum (largest) values.

Let’s say we want to find the publish year of the oldest book:

```sql
SELECT MIN(published) FROM books;

Returns:
1966
```

Or, perhaps we need to find out the number of pages of the largest book:

```sql
SELECT MAX(pages) FROM books;

Returns:
591
```

## The problem with MIN & MAX

But what if we want to search for the title of the book that will take the longest to read? This is a little trickier, as the following won’t work:

```sql
SELECT title, MAX(pages) FROM books;

Returns:

title             MAX(pages)
----------------------------
The Alchemist     591
```

We know from looking at the original table that this isn’t correct - The Alchemist has just 161 pages. What’s happening here? Well, since there is only one maximum value, SQL will only return one row - the first row. It’s seems a little counterintuitive at first but it makes sense from SQL’s point of view.

### Subqueries

To find out which book is definitely the longest, we’ll need to make use of a ‘subquery'. A subquery, is simply a query within another query, wrapped up using brackets. For example:

```sql
SELECT title, pages FROM books
WHERE pages = (SELECT MAX(pages) FROM books);

Returns:

title                    pages
------------------------------
Magicians Of The Gods    591
```

The easiest way to think about this is actually to work _backwards_. Let’s break it down:

- In the subquery above, we’re simply selecting the highest number of pages from the table. This results in a value of 591.
- Then, we’re selecting the _title_ and _pages_ columns where _pages_ is equal to the result from the subquery (591).
- As _Magicians Of The Gods_' page count matches 591, SQL returns that result.

Pretty nifty. HOWEVER…

Using MIN() or MAX() can take up _a lot_ of processing power, especially when working with large databases containing thousands of records. They need to query the entire table to figure out which value is the lowest or highest, which isn’t the most efficient way.

Instead, we can use _ORDER BY_ and _LIMIT_:

```sql
SELECT title, pages FROM books
ORDER BY pages
DESC LIMIT 1;

Returns:

title                    pages
------------------------------
Magicians Of The Gods    591
```

Yep, that returns the same result. Plus, instead of looking for a maximum number, SQL can simply return the first row it finds in descending order of pages. Nice.

## SUM

Where COUNT() returns the number of rows that match the criteria we pass in, _SUM()_ returns the _sum total_ of a numeric column.

We can use SUM() to find out the total number of pages from all of the books in the table. This query isn’t very useful in itself, but it helps to illustrate how SUM() works:

```sql
SELECT SUM(pages) FROM books;

Returns:
2905
```

So, rather than adding up the number of rows, it sums all _pages_.

## AVG

The _AVG()_ function will return the (you guessed it) _average value_ of a numeric column. Following on from the last example, let’s calculate the average page count between all of the books:

```sql
SELECT AVG(pages) FROM books;

Returns:
415
```

You can imagine how useful this functionality would be if you were dealing with book sales, costs, prices etc.

We could even work out the average number of pages in the books by the year they were released:

```sql
SELECT published, AVG(pages) FROM books
GROUP BY published;

Returns:

published        AVG(pages)
---------------------------
1966             577.0000
1984             320.0000
1988             161.0000
2013             551.0000
2016             443.5000
2018             409.0000
```

Note that integers are returned to _4 decimal places_ - this is standard in SQL.

## Conclusion

There we have it! You may have noticed that the dataset provided is super simple, but hopefully it helped you to understand the core functionality of aggregate functions.

You can see that, when working with large quantities of complex data, these tools would enable you to return useful information and answer complex questions. You'll be the talk of the town.
