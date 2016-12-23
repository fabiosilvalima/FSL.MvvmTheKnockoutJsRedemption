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