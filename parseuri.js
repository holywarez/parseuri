// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
//
// Upgraded by Anatoly Lapshin

(function() {

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };

    var URI = window.URI = {};

    var extensionPack = {

        isAbsolute: function() {
            return !this.isRelative();
        },

        isRelative: function() {
            return !this.host;
        },

        toString: function(except) {
            var except = except || [];
            var result = "";
            var original = "";
            if (this.protocol) {
                if (!except.contains('protocol')) result += this.protocol + "://";
                original += this.protocol + "://";
                if (this.userInfo) {
                    if (!except.contains('userInfo')) result += this.userInfo + "@";
                    original += this.userInfo + "@";
                }

                if (this.host) {
                    if (!except.contains('host')) result += this.host;
                    original += this.host;
                }

                if (this.port) {
                    if (!except.contains('port'))  result += ":" + this.port;
                    original += ":" + this.port;
                }
            }

            if (this.path) {
                if (!except.contains('path')) result += this.path;
                original += this.path;
            }

            if (this.queryKey) {
                var queryString = "";
                var first = true;
                for (var key in this.qls ueryKey) {
                    if (!this.queryKey.hasOwnProperty(key)) continue;

                    if (!first) queryString += "&";
                    queryString += key + "=" + this.queryKey[key];
                    first = false;
                }

                if (!except.contains('queryKey')) result += "?" + queryString;
                original += "?" + queryString;
            }

            if (this.anchor) {
                if (!except.contains('anchor')) result += "#" + this.anchor;
                original += "#" + this.anchor;
            }

            jQuery.extend(this, URI.parse(original));

            return result;
        }
    };


    URI.parse = function (str) {
        var o = URI.options,
                m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
                uri = {},
                i = 14;

        while (i--) uri[o.key[i]] = m[i] || "";

        uri[o.q.name] = {};
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if ($1) uri[o.q.name][$1] = $2;
        });

        return jQuery.extend(uri, extensionPack);
    };


    URI.options = {
        strictMode: false,
        key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:   {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };
})();