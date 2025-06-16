# dash-element-web
Make fast designs for websites with minimal coding.

(Not done yet)

  • I will add more functionality later.
  
  • Adding a export to html and css feature later.
  
  • Organize code next time lmao.
  
  • Export to android apk and windows exe after a stable version.

  # How to use:
Go to the big ass text box to type this:

/element="{put the type of element here}" - elements like h1, h2, button shit like that.
/value id="{put an id here to refer something}" nest="{put this element under some element:}" - yeah.
{text value inside this element put here}
-end- #this is important if you don't do this then the element below this won't work

--Styling
/style={the id of an existing element} {classes of tachyons} - this uses the tachyons template for css styles so go to the tachyons website for classes

# Example Usage:

/element=h2
/value id=titlething
TESTWEB
-end-

/element=div
/value id=textInnerContainer
-end-

/element=div
/value id=articleText nest=textInnerContainer
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium pellentesque sapien, ac faucibus massa laoreet vel. Nulla justo mauris, blandit vitae euismod ac, suscipit quis ante. Suspendisse auctor pellentesque urna sit amet congue. Nunc tincidunt urna ac leo maximus elementum. Nulla tempor ante non odio tincidunt, quis mattis leo elementum. Integer sodales maximus tempor. Fusce a arcu pretium, ornare eros id, tristique est. Curabitur tincidunt at lorem vel suscipit. In at ornare velit. Sed non metus at ligula sodales aliquam eu id purus. Etiam tortor magna, aliquam vel ipsum vitae, congue elementum ipsum. Praesent dictum leo id dui porttitor vehicula.

Nunc at turpis metus. Duis tristique euismod felis, eget aliquet velit posuere quis. Sed vel euismod risus, id commodo risus. Nam ante dui, dictum vitae convallis quis, gravida et leo. Ut ac sapien at ligula mattis feugiat. Aenean venenatis sem ac ex ultricies, interdum fringilla sapien efficitur. Maecenas ac velit sit amet arcu varius laoreet in nec lorem. Duis varius nunc at ante condimentum porttitor. Fusce vitae nibh orci.
-end-

/style=titlething bg-moon-gray,w-100,f1,tc
/style=textInnerContainer w-100,flex,flex-column,items-center,mv3
/style=articleText tl,w-90
