
// Tab settings
const tabOnLoad = 1;
const tabStart = 300; // degrees from center right
const tabCenter = 90; // degrees from start
const tabEnd = 200;   // degrees from start
const spaceBetween = 20; //deg
const tabRadius = 44.5; // from center

// Page content (keys must be unique)
const contentObj = {
  '1': {
    tabText: 'Tab 1',
  },
  '2': {
    tabText: 'Tab 2',
  },
  '3': {
    tabText: 'Tab 3',
  },
  '4': {
    tabText: 'Tab 4',
  },
  '5': {
    tabText: 'Tab 5',
  },
  '6': {
    tabText: 'Tab 6',
  },
}

const tabHovered = { //hovered/selected
    'background': 'rgba(255,255,255,0.4)',
    'width': 'auto',
    'height': '32px',
    'color': 'white',
    'font-size': '12px',
    'line-height': '250%',
    'box-shadow': '0 0 10px 5px #0ff',
    'border': '3px solid #0ff'
};

const tabUnhovered = {
  'background': 'rgba(255,255,255,0.4)',
  'min-width': '30px',
  'height': 'auto',
  'color': 'rgba(255, 255, 255, 0.5)',
  'font-size': '18px',
  'line-height': 'normal',
  'box-shadow': 'none',
  'border': 'none'
}

// set tab text direction based on vertical center
function setTabs(element, pos) {
  if  (pos >= 90 && pos <= 270) {
    $(element).css('transform', 'rotate(' + pos + 'deg) translateX(' + tabRadius + 'vmin) scale(-1, -1)');
  } else {
    $(element).css('transform', 'rotate(' + pos + 'deg) translateX(' + tabRadius + 'vmin) scale(1, 1)');
  }
}

// build tabs at starting locations
function initializeTabs(tabStart, tabCenter, tabEnd, spaceBetween){
  let count = 1;

  // loop all content items
  for (const item in contentObj) {

    // set element properties
    let element = $('<p>', {
      'id': count,
      'data-start': tabStart,
      'data-center': tabCenter,
      'data-end': tabEnd,
      'data-state': '0',
      'name': contentObj[count]['tabText'],
      'text': count
    });
    
    // tab text orientation
    setTabs(element, tabStart);
    
    // add element to menu
    $('.circle').append(element);
    
    // set tab spacing
    tabStart += spaceBetween;
    tabCenter += spaceBetween;
    tabEnd += spaceBetween;
    count++;
  }
}

initializeTabs(tabStart, tabCenter, tabEnd, spaceBetween);

// move tabs based on clicked element
// change tabEnd and tabCenter to + for cw
function handleTabs(event) {
  let selected = parseInt($(event).attr('id'));
  let state = $(event).data('state');
  let shift = '';
  let elements = $('.circle p').get();
  
  // cycle through all tab elements
  for (var i = elements.length - 1; i >= 0; i--) {
    let element = elements[i];
    let pos = parseInt($(element).attr('id'));
    
    // if tab is before selected
    if (pos < selected) {
      
      if (state == 0) {
        // set tab position inactive
        shift = $(element).data('start') - tabEnd;
        $(element).data('state', 1);
        $(element).css(tabUnhovered);
        $(element).html($(element).attr('id'));
        setTabs(element, shift);
      } 
      
    // if tab is after selected
    } else if (pos > selected) {
      // set tab to starting position
      shift = $(element).data('start');
      $(element).data('state', 0);
      $(element).css(tabUnhovered);
      $(element).html($(element).attr('id'));
      setTabs(element, shift);
      
    // selected tab
    } else if (pos == selected) {
      // set or keep tab active
      shift = $(element).data('start') - tabCenter;
      $(element).data('state', 2);
      $(element).css(tabHovered);
      $(element).html($(element).attr('name'));
      
      setTabs(element, shift);
    }
  }
}

// toggle tab hover effects
$('.circle p').hover(function() {
  $(this).css(tabHovered);
    $(this).text($(this).attr('name'));
  $('.circle').css('z-index', '3');
}, function() {
  if ($(this).data('state') != 2) {
    $(this).css(tabUnhovered);
    $(this).text($(this).attr('id'));
    $('.circle').css('z-index', '1');
  }
});

// handle tab clicks
$('.circle p').click(function() {
  handleTabs(this);
});

// arrange starting tabs
handleTabs($('#' + tabOnLoad));
