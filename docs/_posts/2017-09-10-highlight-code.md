---
layout: me
title:  "New code highlight!"
date:   2017-09-10 16:29:43 +0100
categories: jekyll update
---

{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}