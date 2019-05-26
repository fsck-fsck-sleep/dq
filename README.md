dirty questions
===============

Answer questions, save to JSON, email to your partner, view theirs.

[Suggestions, bug reports][issue] and [patches][pull] welcome.

[issue]: https://github.com/fsck-fsck-sleep/dq/issues/new
[pull]: https://github.com/fsck-fsck-sleep/dq/compare

Available under GNU Affero Public License; see COPYING for details

# Developing

Check out the code, then use a web server to load it to a browser. If you're
running some kind of GNU/Linux, this might work:

	$ git clone https://fsck-fsck-sleep@github.com/fsck-fsck-sleep/dq.git
	$ cd dq
	$ python -m SimpleHTTPServer

Then open http://127.0.0.1:8000 in your browser.

If you want to make any changes to the stylesheet, you'll probably want
[Stylus](http://stylus-lang.com/) running to compile it:

	stylus -w dirtyquestions.styl -I bower_components/jeet/stylus/
