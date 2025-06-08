#!/bin/sh
if [ -f .donotcountlist ]; then
  exclude=$(cat .donotcountlist | tr '\n' '|' | sed 's/|$//')
  filter="| grep -Ev '^($exclude)$'"
else
  filter=""
fi

count=$(ls | sed '/^.*\..*$/d' | sed '/^js$/d' | eval "cat - $filter" | wc -l)

if [ "$count" -lt 20 ]; then
  echo "Warning: Only $count sketches found!" 1>&2
  echo '<div style="color:#c00;font-weight:bold;margin:2rem 0 1rem 0;text-align:center;">Warning: Only '$count' sketches found!</div>' > .warn.tmp
else
  echo "" > .warn.tmp
fi

if [ -f .donotcountlist ]; then
  ls | sed '/^.*\..*$/d' | sed '/^js$/d' | grep -Ev '^('$(cat .donotcountlist | tr '\n' '|')')$' | awk '{
    if (system("[ -f \"" $0 "/preview.png\" ]") == 0) {
      print "<a href=\"" $0 "\"><img src=\"" $0 "/preview.png\" style=\"width:80px;height:80px;object-fit:cover;vertical-align:middle;border-radius:8px;margin-right:12px;box-shadow:0 2px 8px #0002;\" />" $0 "</a><br />"
    } else {
      print "<a href=\"" $0 "\">" $0 "</a><br />"
    }
  }' > .links.tmp
  ls | sed '/^.*\..*$/d' | sed '/^js$/d' | grep -E '^('$(cat .donotcountlist | tr '\n' '|')')$' | awk '{
    if (system("[ -f \"" $0 "/preview.png\" ]") == 0) {
      print "<a href=\"" $0 "\"><img src=\"" $0 "/preview.png\" style=\"width:80px;height:80px;object-fit:cover;vertical-align:middle;border-radius:8px;margin-right:12px;box-shadow:0 2px 8px #0002;\" />" $0 "</a><br />"
    } else {
      print "<a href=\"" $0 "\">" $0 "</a><br />"
    }
  }' >> .links.tmp
else
  ls | sed '/^.*\..*$/d' | sed '/^js$/d' | awk '{
    if (system("[ -f \"" $0 "/preview.png\" ]") == 0) {
      print "<a href=\"" $0 "\"><img src=\"" $0 "/preview.png\" style=\"width:80px;height:80px;object-fit:cover;vertical-align:middle;border-radius:8px;margin-right:12px;box-shadow:0 2px 8px #0002;\" />" $0 "</a><br />"
    } else {
      print "<a href=\"" $0 "\">" $0 "</a><br />"
    }
  }' > .links.tmp
fi

cat .head.template .warn.tmp .links.tmp .tail.template >index.html
rm .warn.tmp .links.tmp
