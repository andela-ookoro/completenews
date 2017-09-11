---
layout: me
title:  "Cele first post"
date:   2012-09-12 16:29:43 +0100
categories: jekyll update
---

Learnt how to a post with jekyll  now ( 11th of Setempber, 2017)

This is my first image
... which is shown in the screenshot below:
![My helpful screenshot]({{ site.url }}/assets/overdeliver.jpg)

... you can my first PDF [On Data science]({{ site.url }}/assets/Data Science from Scratch- First Principles with Python.pdf) directly.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>