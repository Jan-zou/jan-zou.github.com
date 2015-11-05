---
layout: page
permalink: /tags/
---


<div class="tag-list">
    {% for tag in site.tags %}
        <a href="#{{ tag[0] }}" class="post-tag">
            <!-- <span class="badge">{{ tag | last | size }}</span> -->
            {{ tag[0] }}
        </a>
    {% endfor %}
</div>

<div class="post">
{% for tag in site.tags %}
    <h2 id="{{ tag[0] }}">{{ tag[0] }}</h2>
    <ul class="preview-posts">
    {% for post in tag[1] %}
        <li>
        <h3>
            <small class="">{{ post.date | date_to_string }}</small>
            <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        </h3>
      </li>
    {% endfor %}
    </ul>
    <hr/>
{% endfor %}
</div>
