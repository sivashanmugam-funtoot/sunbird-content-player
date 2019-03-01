//@ sourceURL=option.js
OptionPlugin.extend({
    _type: "org.ekstep.funtoot.option",
    initPlugin: function (data) {
        this._super(data);
    },
    /**
    * callback when microhint is clicked
    * gets the microhint data and displays the microhint popup 
    */
    onMicroHint: function () {
        console.log("microhint");
        var helper = PluginManager.getPluginObject('plugin_helper');
        var model = this._modelValue;
        var mhData = {};
        mhData.title = 'Micro hint';
        mhData.type = "mh";
        mhData.x = 10; mhData.y = 10; mhData.w = 80; mhData.h = 60;
        mhData.content = model.mh;
        helper.showPopup(mhData);
    },
    /**
     * callback - called after submit button is pressed.
     * shows or hides microhint depending on the answer given
     * @param {Object} cell- cellId on which the microhint is attached
     */
    onEvaluate: function (cell) {
        console.log('option - onEvaluate called!');
        var model = this._modelValue;
        var tbcobj = PluginManager.getPluginObject(cell + '-mh-mhicon');
        if (!model.isCorrect) {
            tbcobj._self.visible = true;
        }
        else {
            tbcobj._self.visible = false;
        }
        Renderer.update = !0;
    }
});