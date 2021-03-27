(function(global) {
  // Globals
  if(!global.BabyKtan) { global.BabyKtan = {}; };
  var BabyKtan = global.BabyKtan;

  // To keep track of which embeds we have already processed
  if(!BabyKtan.foundEls) BabyKtan.foundEls = [];
  var foundEls = BabyKtan.foundEls;

  if(!BabyKtan.styleTags) BabyKtan.styleTags = [];
  var styleTags = BabyKtan.styleTags;

  // Size lookup table
  if (!BabyKtan.sizes) BabyKtan.sizes = {
    0: 'XXS',
    1: 'XS',
    2: 'S',
    3: 'M',
    4: 'L',
    5: 'XL'
  };
  var ktan_sizes = BabyKtan.sizes;

  // var base_asset_uri = "https://www.babyktan.com/template/SizingWidget/";
  var base_asset_uri = "https://cdn.shopify.com/s/files/1/0419/9373/2264/files/"

  var form = document.createElement('form');
  form.setAttribute('class', 'dashboard_widget');

  var header = document.createElement('div');
  header.setAttribute('class', 'row header');

  var form_header = document.createElement('div');
  form_header.setAttribute('class', 'small-10 columns form_header');

  var logo = document.createElement('img');
  logo.setAttribute('class', 'logo');
  // logo.src = base_asset_uri + 'logo.png';
  logo.src = base_asset_uri + 'logo_e5bf5e6d-5ab8-4c13-a132-c6e659062d59.png'
  form_header.appendChild(logo);
  form_header.appendChild(document.createTextNode(" Sizing Calculator"));

  header.appendChild(form_header);
  var two_col_spacer = document.createElement('div');
  two_col_spacer.setAttribute('class', 'small-2 columns');
  two_col_spacer.innerHTML = "&nbsp;";
  header.appendChild(two_col_spacer);

  var form_content = document.createElement('div');
  form_content.setAttribute('class', 'row form_content');

  var sex_male_label = document.createElement('label');
  sex_male_label.id = 'sex_male_label';
  sex_male_label.setAttribute('class', 'baby_ktan');
  sex_male_label.setAttribute('for', 'sex_male');
  sex_male_label.innerHTML = "Male";

  var sex_male = document.createElement('input');
  sex_male.id = 'sex_male';
  sex_male.class = 'baby_ktan';
  sex_male.name = 'sex';
  sex_male.setAttribute('type', 'radio');
  sex_male.setAttribute('value', 'male');
  sex_male.onchange = function() {
    document.getElementById('dress_size_label').setAttribute('class', 'hidden');
    document.getElementById('dress_size').setAttribute('class', 'hidden');
    document.getElementById('weight_label_female').setAttribute('class', 'hidden');
    document.getElementById('jacket_size_label').setAttribute('class', 'visible');
    document.getElementById('jacket_size').setAttribute('class', 'baby_ktan visible');
    document.getElementById('weight_label_male').setAttribute('class', 'visible');
  }

  var sex_female_label = document.createElement('label');
  sex_female_label.id = 'sex_female_label';
  sex_female_label.setAttribute('class', 'baby_ktan');
  sex_female_label.setAttribute('for', 'sex_female');
  sex_female_label.innerHTML = "Female";

  var sex_female = document.createElement('input');
  sex_female.id = 'sex_female';
  sex_female.class = 'baby_ktan';
  sex_female.name = 'sex';
  sex_female.setAttribute('type', 'radio');
  sex_female.setAttribute('value', 'female');
  sex_female.setAttribute('checked', true);
  sex_female.onchange = function() {
    document.getElementById('dress_size_label').setAttribute('class', 'visible');
    document.getElementById('dress_size').setAttribute('class', 'baby_ktan visible')
    document.getElementById('weight_label_female').setAttribute('class', 'visible');
    document.getElementById('jacket_size_label').setAttribute('class', 'hidden');
    document.getElementById('jacket_size').setAttribute('class', 'hidden');
    document.getElementById('weight_label_male').setAttribute('class', 'hidden');
  }

  var gender = document.createElement('div');
  gender.id = "gender"
  gender.setAttribute('class', 'small-12 columns');
  gender.appendChild(sex_female);
  gender.appendChild(sex_female_label);
  gender.appendChild(sex_male);
  gender.appendChild(sex_male_label);

  form_content.appendChild(gender);

  var size_label = document.createElement('div');
  size_label.setAttribute('class', 'small-12 columns');

  var dress_size_label = document.createElement('label');
  dress_size_label.id = 'dress_size_label';
  dress_size_label.setAttribute('for', 'dress_size');
  dress_size_label.innerHTML = "Pre-Pregnancy Dress Size:";

  var jacket_size_label = document.createElement('label');
  jacket_size_label.id = 'jacket_size_label';
  jacket_size_label.setAttribute('for', 'jacket_size');
  jacket_size_label.innerHTML = "Jacket Size:";
  jacket_size_label.setAttribute('class', 'hidden');

  size_label.appendChild(dress_size_label);
  size_label.appendChild(jacket_size_label);

  form_content.appendChild(size_label);

  var dress_size = document.createElement('input');
  dress_size.id = 'dress_size';
  dress_size.name = 'dress_size';
  dress_size.setAttribute('class', 'baby_ktan');
  dress_size.setAttribute('type', 'number');
  dress_size.setAttribute('min', '0');
  dress_size.setAttribute('max', '24');
  dress_size.setAttribute('step', '2');
  dress_size.setAttribute('value', '10');

  var jacket_size = document.createElement('input');
  jacket_size.id = 'jacket_size';
  jacket_size.name = 'jacket_size';
  jacket_size.setAttribute('class', 'baby_ktan');
  jacket_size.setAttribute('type', 'number');
  jacket_size.setAttribute('min', '30');
  jacket_size.setAttribute('max', '56');
  jacket_size.setAttribute('value', '42');
  jacket_size.setAttribute('class', 'hidden');

  var size = document.createElement('div');
  size.setAttribute('class', 'small-7 columns');

  size.appendChild(dress_size);
  size.appendChild(jacket_size);

  form_content.appendChild(size);

  var size_country = document.createElement('select');
  size_country.id = 'size_country';
  size_country.onchange = function() {
    if (this.options[this.selectedIndex].value == 'US') {
      document.getElementById('dress_size').setAttribute('min', '0');
      document.getElementById('dress_size').setAttribute('max', '24');
      document.getElementById('dress_size').setAttribute('step', '2');
      document.getElementById('dress_size').setAttribute('value', '10');
      document.getElementById('jacket_size').setAttribute('min', '30');
      document.getElementById('jacket_size').setAttribute('max', '56');
      document.getElementById('jacket_size').setAttribute('value', '42');
    } else if (this.options[this.selectedIndex].value == 'CAN') {
      document.getElementById('dress_size').setAttribute('min', '0');
      document.getElementById('dress_size').setAttribute('max', '24');
      document.getElementById('dress_size').setAttribute('step', '2');
      document.getElementById('dress_size').setAttribute('value', '10');
      document.getElementById('jacket_size').setAttribute('min', '30');
      document.getElementById('jacket_size').setAttribute('max', '56');
      document.getElementById('jacket_size').setAttribute('value', '42');
    } else if (this.options[this.selectedIndex].value == 'UK') {
      document.getElementById('dress_size').setAttribute('min', '2');
      document.getElementById('dress_size').setAttribute('max', '26');
      document.getElementById('dress_size').setAttribute('step', '2');
      document.getElementById('dress_size').setAttribute('value', '12');
      document.getElementById('jacket_size').setAttribute('min', '30');
      document.getElementById('jacket_size').setAttribute('max', '56');
      document.getElementById('jacket_size').setAttribute('value', '42');
    } else if (this.options[this.selectedIndex].value == 'EU') {
      document.getElementById('dress_size').setAttribute('min', '30');
      document.getElementById('dress_size').setAttribute('max', '54');
      document.getElementById('dress_size').setAttribute('step', '2');
      document.getElementById('dress_size').setAttribute('value', '30');
      document.getElementById('jacket_size').setAttribute('min', '40');
      document.getElementById('jacket_size').setAttribute('max', '66');
      document.getElementById('jacket_size').setAttribute('value', '52');
    } else if (this.options[this.selectedIndex].value == 'AUS/NZ') {
      document.getElementById('dress_size').setAttribute('min', '4');
      document.getElementById('dress_size').setAttribute('max', '28');
      document.getElementById('dress_size').setAttribute('step', '2');
      document.getElementById('dress_size').setAttribute('value', '14');
      document.getElementById('jacket_size').setAttribute('min', '30');
      document.getElementById('jacket_size').setAttribute('max', '56');
      document.getElementById('jacket_size').setAttribute('value', '42');
    }
  }

  var size_countries = [ "US", "CAN", "UK", "EU", "AUS/NZ" ];
  for (var i = 0; i < size_countries.length; i++) {
    var option = document.createElement("option");
    option.value = size_countries[i];
    option.text = size_countries[i];
    size_country.appendChild(option);
  }
  // Women
  // CAN = US
  // UK = +2
  // EU = +30
  // AUS/NZ = +4

  var countries = document.createElement('div')
  countries.setAttribute('class', 'small-5 columns select');

  countries.appendChild(size_country);

  form_content.appendChild(countries);

  var height_label_row = document.createElement('div');
  height_label_row.setAttribute('class', 'small-12 columns');

  var height_label = document.createElement('label');
  height_label.id = 'height_label';
  height_label.setAttribute('for', 'height');
  height_label.innerHTML = "Height:";

  height_label_row.appendChild(height_label);

  form_content.appendChild(height_label_row);

  var height_values = document.createElement('div');
  height_values.setAttribute('class', 'small-7 columns');

  var inches_span = document.createElement('span');
  inches_span.id = 'inches';

  var inches_div_row = document.createElement('div');
  inches_div_row.setAttribute('class', 'row collapse');

  var height_ft = document.createElement('input');
  height_ft.id = 'height_ft';
  height_ft.name = 'height_ft';
  height_ft.setAttribute('class', 'baby_ktan');
  height_ft.setAttribute('type', 'number');
  height_ft.setAttribute('min', '4');
  height_ft.setAttribute('max', '6');
  height_ft.setAttribute('value', '5');

  var ft_div = document.createElement('div');
  ft_div.setAttribute('class', 'small-4 columns');
  ft_div.appendChild(height_ft);

  var height_in = document.createElement('input');
  height_in.id = 'height_in';
  height_in.name = 'height_in';
  height_in.setAttribute('class', 'baby_ktan');
  height_in.setAttribute('type', 'number');
  height_in.setAttribute('min', '0');
  height_in.setAttribute('max', '11');
  height_in.setAttribute('value', '5');

  var in_div = document.createElement('div');
  in_div.setAttribute('class', 'small-4 columns');
  in_div.appendChild(height_in);

  var ft_mark = document.createElement('span');
  ft_mark.setAttribute('class', 'postfix');
  ft_mark.id = 'ft_mark';
  ft_mark.innerHTML = "'";

  var ft_mark_div = document.createElement('div');
  ft_mark_div.setAttribute('class', 'small-2 columns');
  ft_mark_div.appendChild(ft_mark);

  var in_mark = document.createElement('span');
  in_mark.setAttribute('class', 'postfix');
  in_mark.id = 'in_mark';
  in_mark.innerHTML = '"';

  var in_mark_div = document.createElement('div');
  in_mark_div.setAttribute('class', 'small-2 columns');
  in_mark_div.appendChild(in_mark);

  inches_div_row.appendChild(ft_div);
  inches_div_row.appendChild(ft_mark_div);
  inches_div_row.appendChild(in_div);
  inches_div_row.appendChild(in_mark_div);

  inches_span.appendChild(inches_div_row);

  height_values.appendChild(inches_span);

  var cm_span = document.createElement('span');
  cm_span.id = 'centimeters';
  cm_span.setAttribute('class', 'hidden');

  var cm_div_row = document.createElement('div');
  cm_div_row.setAttribute('class', 'row collapse');

  var height_cm = document.createElement('input');
  height_cm.id = 'height_cm';
  height_cm.name = 'height_cm';
  height_cm.setAttribute('class', 'baby_ktan');
  height_cm.setAttribute('type', 'number');
  height_cm.setAttribute('min', '120');
  height_cm.setAttribute('max', '214');
  height_cm.setAttribute('value', '165');

  cm_div = document.createElement('div');
  cm_div.setAttribute('class', 'small-12 columns');
  cm_div.appendChild(height_cm);

  cm_div_row.appendChild(cm_div);
  cm_span.appendChild(cm_div_row);

  height_values.appendChild(cm_span);

  form_content.appendChild(height_values);

  var height_unit = document.createElement('select');
  height_unit.id = 'height_unit';
  height_unit.onchange = function() {
    if (this.options[this.selectedIndex].value == 'cm') {
      document.getElementById('inches').setAttribute('class', 'hidden');
      document.getElementById('centimeters').setAttribute('class', 'visible');
    } else {
      document.getElementById('inches').setAttribute('class', 'visible');
      document.getElementById('centimeters').setAttribute('class', 'hidden');
    }
  }

  var height_units = [ "in", "cm" ];
  for (var i = 0; i < height_units.length; i++) {
    var option = document.createElement("option");
    option.value = height_units[i];
    option.text = height_units[i];
    height_unit.appendChild(option);
  }

  var height_unit_div = document.createElement('div')
  height_unit_div.setAttribute('class', 'small-5 columns select');
  height_unit_div.appendChild(height_unit);

  form_content.appendChild(height_unit_div);

  var weight_label_female = document.createElement('label');
  weight_label_female.id = 'weight_label_female';
  weight_label_female.setAttribute('for', 'weight');
  weight_label_female.innerHTML = "Pre-Pregnancy Weight:";

  var weight_label_male = document.createElement('label');
  weight_label_male.id = 'weight_label_male';
  weight_label_male.setAttribute('for', 'weight');
  weight_label_male.innerHTML = "Weight:";
  weight_label_male.setAttribute('class', 'hidden');

  var weight_label = document.createElement('div');
  weight_label.setAttribute('class', 'small-12 columns');

  weight_label.appendChild(weight_label_female);
  weight_label.appendChild(weight_label_male);

  form_content.appendChild(weight_label);

  var weight_values = document.createElement('div');
  weight_values.setAttribute('class', 'small-7 columns');

  var weight_lbs = document.createElement('input');
  weight_lbs.id = 'weight_lbs';
  weight_lbs.name = 'weight_lbs';
  weight_lbs.setAttribute('class', 'baby_ktan');
  weight_lbs.setAttribute('type', 'number');
  weight_lbs.setAttribute('min', '50');
  weight_lbs.setAttribute('max', '350');
  weight_lbs.setAttribute('step', '5');
  weight_lbs.setAttribute('value', '160');

  var weight_kg = document.createElement('input');
  weight_kg.id = 'weight_kg';
  weight_kg.name = 'weight_kg';
  weight_kg.setAttribute('type', 'number');
  weight_kg.setAttribute('min', '22');
  weight_kg.setAttribute('max', '160');
  weight_kg.setAttribute('step', '1');
  weight_kg.setAttribute('value', '70');
  weight_kg.setAttribute('class', 'hidden');

  weight_values.appendChild(weight_lbs);
  weight_values.appendChild(weight_kg);

  form_content.appendChild(weight_values);

  var weight_unit = document.createElement('select');
  weight_unit.id = 'weight_unit';
  weight_unit.onchange = function() {
    if (this.options[this.selectedIndex].value == 'lbs') {
      document.getElementById('weight_lbs').setAttribute('class', 'baby_ktan visible');
      document.getElementById('weight_kg').setAttribute('class', 'hidden');
    } else {
      document.getElementById('weight_lbs').setAttribute('class', 'hidden');
      document.getElementById('weight_kg').setAttribute('class', 'baby_ktan visible');
    }
  }

  var weight_units = [ "lbs", "kg" ];
  for (var i = 0; i < weight_units.length; i++) {
    var option = document.createElement("option");
    option.value = weight_units[i];
    option.text = weight_units[i];
    weight_unit.appendChild(option);
  }

  var weight_unit_div = document.createElement('div')
  weight_unit_div.setAttribute('class', 'small-5 columns select');
  weight_unit_div.appendChild(weight_unit);

  form_content.appendChild(weight_unit_div);

  var button = document.createElement('button');
  button.id = 'calculate_size';
  button.name = 'calculate_size';
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'small radius secondary expand button');
  button.innerHTML = 'Calculate Size';
  button.onclick = function() {

    var height;
    var height_units = document.getElementById('height_unit');
    // Convert everything to inches
    if (height_units.options[height_units.selectedIndex].value == 'cm') {
      height = Math.round(parseInt(document.getElementById('height_cm').value) * 0.3937);
    } else {
      height = parseInt(document.getElementById('height_ft').value) * 12 + parseInt(document.getElementById('height_in').value);
    }

    var weight;
    var weight_units = document.getElementById('weight_unit');
    // Convert everything to pounds
    if (weight_units.options[weight_units.selectedIndex].value == 'kg') {
      weight = Math.round(parseInt(document.getElementById('weight_kg').value) * 2.20462);
    } else {
      weight = document.getElementById('weight_lbs').value;
    }

    var ktan_size;

    if (document.getElementById('sex_male').checked == true) {
      var jacket_size;
      var size_country = document.getElementById('size_country');
      // Normalize to US
      if (size_country.options[size_country.selectedIndex].value == 'US') {
        jacket_size = document.getElementById('jacket_size').value;
      } else if (size_country.options[size_country.selectedIndex].value == 'CAN') {
        jacket_size = document.getElementById('jacket_size').value;
      } else if (size_country.options[size_country.selectedIndex].value == 'UK') {
        jacket_size = document.getElementById('jacket_size').value;
      } else if (size_country.options[size_country.selectedIndex].value == 'EU') {
        jacket_size = parseInt(document.getElementById('jacket_size').value) - 10;
      } else if (size_country.options[size_country.selectedIndex].value == 'AUS/NZ') {
        jacket_size = document.getElementById('jacket_size').value;
      }

      if (height <= 62 && jacket_size > 38) {
        jacket_size = jacket_size - 1;
      }
      if (jacket_size <= 36) {
        if (weight < 131) {
          ktan_size = 1; // XS
        } else if (weight >= 131 && weight < 156) {
          ktan_size = 2; // S
        } else {
          ktan_size = 3; // M
        }
      } else if (jacket_size >= 37 && jacket_size < 39) {
        if (weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 196) {
          ktan_size = 3; // M
        } else {
          ktan_size = 4; // L
        }
      } else if (jacket_size >= 39 && jacket_size < 43) {
        if (weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 196) {
          ktan_size = 3; // M
        } else {
          ktan_size = 4; // L
        }
      } else if (jacket_size >= 43 && jacket_size < 47) {
        if (weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 181) {
          ktan_size = 3; // M
        } else {
          ktan_size = 4; // L
        }
      } else {
        if (weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 181) {
          ktan_size = 3; // M
        } else if (weight >= 171 && weight < 221) {
          ktan_size = 4; // L
        } else {
          ktan_size = 5; // XL
        }
      }
    } else {
      var dress_size;
      var size_country = document.getElementById('size_country');
      // Normalize to US
      if (size_country.options[size_country.selectedIndex].value == 'US') {
        dress_size = document.getElementById('dress_size').value;
      } else if (size_country.options[size_country.selectedIndex].value == 'CAN') {
        dress_size = document.getElementById('dress_size').value;
      } else if (size_country.options[size_country.selectedIndex].value == 'UK') {
        dress_size = parseInt(document.getElementById('dress_size').value) - 2;
      } else if (size_country.options[size_country.selectedIndex].value == 'EU') {
        dress_size = parseInt(document.getElementById('dress_size').value) - 30;
      } else if (size_country.options[size_country.selectedIndex].value == 'AUS/NZ') {
        dress_size = parseInt(document.getElementById('dress_size').value) - 4;
      }

      if (height <= 62 && dress_size > 0) {
        dress_size = dress_size - 2;
      }
      if (dress_size <= 0) {
        if (weight < 101) {
          ktan_size = 0; // XXS
        } else if (weight >= 101 && weight < 131) {
          ktan_size = 1; // XS
        } else {
          ktan_size = 2; // S
        }
      } else if (dress_size > 0 && dress_size < 6) {
        if (weight < 140) {
          ktan_size = 1; // XS
        } else if (weight >= 140 && weight < 170) {
          ktan_size = 2; // S
        } else {
          ktan_size = 3; // M
        }
      } else if (dress_size >= 6 && dress_size < 8) {
        if (weight < 131) {
          ktan_size = 1; // XS
        } else if (weight >= 131 && weight < 161) {
          ktan_size = 2; // S
        } else if (weight >= 161 && weight < 181) {
          ktan_size = 3; // M
        } else {
          ktan_size = 4; // L
        }
      } else if (dress_size >= 8 && dress_size < 16) {
        if (weight < 121) {
          ktan_size = 1; // XS
        } else if (weight >= 121 && weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 181) {
          ktan_size = 3; // M
        } else {
          ktan_size = 4; // L
        }
      } else if (dress_size >= 16 && dress_size < 20) {
        if (weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 181) {
          ktan_size = 3; // M
        } else {
          ktan_size = 4; // L
        }
      } else {
        if (weight < 151) {
          ktan_size = 2; // S
        } else if (weight >= 151 && weight < 181) {
          ktan_size = 3; // M
        } else if (weight >= 181 && weight < 231) {
          ktan_size = 4; // L
        } else {
          ktan_size = 5; // XL
        }
      }
    }
    var message = "Your Baby Ktan size is " + ktan_sizes[ktan_size];

    my_size = document.getElementById('my_size')
    my_size.innerHTML = message;
  }

  var button_div = document.createElement('div');
  button_div.setAttribute('class', 'small-12 columns');
  button_div.appendChild(button);
  form_content.appendChild(button_div);

  var my_size = document.createElement('div');
  my_size.setAttribute('class', 'small-12 columns')
  my_size.id = 'my_size';
  my_size.name = 'my_size';
  my_size.innerHTML = "&nbsp;";

  form_content.appendChild(my_size);

  form.appendChild(header);
  form.appendChild(form_content);

  var els = document.getElementsByTagName('script');
  var re = /.*sizing-widget.*.js/;

  for(var i = 0; i < els.length; i++) {
    var el = els[i];

    if(el.src.match(re) && foundEls.indexOf(el) < 0) {
      foundEls.push(el);

      // Create container div
      var container = document.createElement('div');
      container.className = 'baby_ktan';

      // Set container ID
      container.id = 'baby-ktan';

      // Add form to the container
      container.appendChild(form);

      // Insert container into DOM
      el.parentNode.insertBefore(container, el);
    }

    var head = document.getElementsByTagName('head')[0];

    // add the style tags into the head (once only)
    if(styleTags.length == 0) {
      var normalize_tag = document.createElement('link');
      normalize_tag.rel = 'stylesheet';
      normalize_tag.type = 'text/css';
      normalize_tag.href = base_asset_uri + 'normalize.css';
      normalize_tag.media = 'all';
      head.appendChild(normalize_tag);
      styleTags.push(normalize_tag);
      var foundation_tag = document.createElement('link');
      foundation_tag.rel = 'stylesheet';
      foundation_tag.type = 'text/css';
      foundation_tag.href = base_asset_uri + 'foundation.css';
      foundation_tag.media = 'all';
      head.appendChild(foundation_tag);
      styleTags.push(foundation_tag);
      var modernizr_tag = document.createElement('script');
      modernizr_tag.type = 'text/javascript';
      modernizr_tag.src = base_asset_uri + 'modernizr.js';
      head.appendChild(modernizr_tag);
      styleTags.push(modernizr_tag);
      var widget_tag = document.createElement("link");
      widget_tag.rel = "stylesheet";
      widget_tag.type = "text/css";
      widget_tag.href = base_asset_uri + 'sizing-widget.css';
      widget_tag.media = "all";
      head.appendChild(widget_tag);
      styleTags.push(widget_tag);
    }
  }
}(this));