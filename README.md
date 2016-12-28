# FSL.MvvmTheKnockoutJsRedemption

**MVVM: The KnockoutJs Redemption**

In this article I will show you how to use KnockoutJS in a simple way writing javascript in Revealing Module Pattern as an alternative to AngularJS.

![enter image description here](https://fabiosilvalima.files.wordpress.com/2016/12/70562_3496_3.jpg?w=616)

> **LIVE DEMO:**
> 
http://codefinal.com/FSL.MvvmTheKnockoutJsRedemption/

---
**KnockoutJS** is javascript plugin with Model-View-View-Model (**MVVM**) pattern. When your data model’s state changes, your UI updates automatically. Like AngularJS it’s provides a full control for a view and his model.

What is the article for?
---

Everyone out there talking about AngularJS or ReactJS and they forget about KnockoutJS and how it can help you. So, this is the KnokoutJS redemption!


What is in the source code?
---

#### <i class="icon-file"></i> FSL.MvvmTheKnockoutJsRedemption

1 – KnockoutJS javascript plugin;
2 – KnockoutJS javascript mapping plugin;
3 – jQuery jsvascript plugin;
4 – Our person viewmodel in javascript;
5 – An index.html for our simple view;

> **Remarks:**

> - I created an empty MVC application application in Visual Studio 2015. 
> - Use the same virtual directory from this article

---


What is the goal?
---

1 – Use KnockoutJS to handle the view stuff;
2 – Write javascript code in Revealing Module Pattern;
3 – Create a feature to insert, edit and delete data;
4 – Demonstrate how KnockoutJS works using mapping, computed variables and computed methods.

![enter image description here](https://fabiosilvalima.files.wordpress.com/2016/12/kocnoutredemption.png)

**Assumptions:**

- 

> You need to create a virtual directory
> "FSL.MvvmTheKnockoutJsRedemption" in your IIS for that application.


Code:
---


**Index.html**
```html
<!DOCTYPE html>
<html>
<head>
    <title>MVVM: The KnockoutJS redemption</title>
    <meta charset="utf-8" />
    <script src="Scripts/jquery-1.10.2.min.js"></script>
    <script src="Scripts/knockout-3.2.0.js"></script>
    <script src="Scripts/knockout.mapping-latest.js"></script>
    <script src="Scripts/view-models/person.js?vswfsd"></script>
</head>
<body>
<div id="person">
<table border="1">
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Gender</th>
<th></th>
</tr>
</thead>
<tbody data-bind="foreach: $root.list">
<tr>
<td><span data-bind="html: $index() + 1"></span></td>
<td>
                        <span data-bind="visible: !$data.IsEditing(), html: $data.Name"></span>
                        <input type="text" data-bind="visible: $data.IsEditing, value: $data.Name" /></td>
<td>
                        <span data-bind="visible: !$data.IsEditing(),html: $root.getGenderName($data)"></span>
                        <select data-bind="visible: $data.IsEditing, options: $root.genders, optionsValue: 'Id', optionsText: 'Name', value: $data.Gender" /></td>
<td>
                        <input type="button" data-bind="visible: !$data.IsEditing(), click: $root.onEdit, enable: !$root.isEditing()" value="edit" />
                        <input type="button" data-bind="visible: $data.IsEditing, click: $root.onSave" value="save" />
                        <input type="button" data-bind="click: $root.onDelete, enable: $data.IsEditing() || !$root.isEditing()" value="delete" /></td>
</tr>
</tbody>
</table>
<input type="button" data-bind="click: $root.onInsert, enable: !$root.isEditing()" value="insert" /></div>
<script type="text/javascript">
        $(document).ready(function () {
            // initial data
            personViewModel.init({ List: [{ Name: 'Jack', Gender: 0, IsEditing: false }, { Name: 'Charlie', Gender: 1, IsEditing: false }, { Name: 'Hugo', Gender: 0, IsEditing: false }] });
        });
    </script>
</body>
</html>
```


**Scripts/view-models/person.js**
```javascript
/// <reference path="../knockout-3.2.0.js" />
/// <reference path="../knockout.mapping-latest.js" />
/// <reference path="../jquery-1.10.2.js" />
 
var personViewModel = function () {
 
    var _vm = null,
 
    map = function (obj) {
        return ko.mapping.fromJS(obj);
    },
 
    createComputed = function () {
 
        _vm.isEditing = ko.computed(function () {
            return $.grep(_vm.list(), function (n) {
                return n.IsEditing() === true;
            }).length > 0;
        }, _vm);
 
    },
 
    init = function (model) {
        _vm = {
            list: map(model.List),
            genders: [
                { Id: 0, Name: 'Select...' },
                { Id: 1, Name: 'Masc' },
                { Id: 2, Name: 'Fem' }
            ],
            test: ko.observable('initial string value'),
            onEdit: function (person) {
                person.IsEditing(true);
            },
            onSave: function (person) {
                person.IsEditing(false);
            },
            onDelete: function (person) {
                if (confirm('Are you sure?')) {
                    var index = _vm.list.indexOf(person);
                    _vm.list.splice(index, 1);
                }
            },
            onInsert: function () {
                _vm.list.push(map({ Name: 'new person', Gender: 0, IsEditing: true }));
            },
            getGenderName: function (person) {
                if (person.Gender() === 0) {
                    return '-';
                }
 
                return $.grep(_vm.genders, function (n) {
                    return n.Id === person.Gender();
                })[0].Name;
            }
        };
 
        createComputed();
 
        var ctx = $('#person').get(0);
        ko.applyBindings(_vm, ctx);
    }
 
    return {
        init: init
    }
 
}();
```

---------

References:
---

- More at my blog click here [fabiosilvalima.net][1];
- Read full article [MVVM: The KnockoutJs Redemption][2];

Licence:
---

- Licence MIT


  [1]: http://fabiosilvalima.net
  [2]: https://fabiosilvalima.net/2016/12/23/mvvm-the-knockoutjs-redemption/
