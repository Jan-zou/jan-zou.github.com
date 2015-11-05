---
layout: page
permalink: /archives/
---

<ul class="preview-posts">
{% for post in site.posts %}
    {% unless post.draft %}
        {% unless post.next %}
<h2>{{ post.date | date: '%Y' }}</h2>
        {% else %}
          {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
          {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
          {% if year != nyear %}
<h2>{{ post.date | date: '%Y' }}</h2>
          {% endif %}
        {% endunless %}

    <li>
        <h3>
            <a href="{{ post.url }}" rel="prefetch" class="title">{{ post.title }}</a>
        </h3>
        <small pubdate datetime="{{ post.date | date: "%Y-%m-%d" }}" title="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date_to_string }}</small>
        <small>
        {% for tag in post.tags %}
        <a class="post-tag" href="/tags/#{{tag}}">{{ tag }}</a>
        {% endfor %}
        </small>
        <hr/>
    </li>
  {% endunless %}
{% endfor %}
</ul>

