// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
//
// Upgraded by Anatoly Lapshin

(function() {
    var URI = window.URI = {};

    var extensionPack = {

        isAbsolute: function() {
            return !this.isRelative();
        },

        isRelative: function() {
            return !this.host;
        },

        toString: function() {
            var result = "";
            if (this.protocol) {
                result += this.protocol + "://";
                if (this.userInfo) {
                    result += this.userInfo + "@";
                }

                if (this.host) {
                    result += this.host;
                }

                if (this.port) {
                    result += ":" + this.port;
                }
            }

            if (this.path) {
                result += this.path;
            }

            if (this.queryKey) {
                var queryString = "";
                var first = true;
                for (var key in this.queryKey) {
                    if (!this.queryKey.hasOwnProperty(key)) continue;

                    if (!first) queryString += "&";
                    queryString += key + "=" + this.queryKey[key];
                    first = false;
                }

                result += "?" + queryString;
            }

            if (this.anchor) {
                result += "#" + this.anchor;
            }

            jQuery.extend(this, URI.parse(result));

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