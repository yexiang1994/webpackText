var BMapLib = window.BMapLib = BMapLib || {};
(function() {
	var b = BMapLib.AreaRestriction = function() {};
	var a = false;
	var c = null;
	var d = null;
	var back = true;
	b.setBounds = function(f,e,isBack) {
		if (!f || !e || !(e instanceof BMap.Bounds)) {
			throw "请检查传入参数值的合法性";
			return false
		}
		if (a) {
			this.clearBounds()
		}
		c = f;
		d = e;
		back = isBack;
		c.addEventListener("moveend", this._mapMoveendEvent);
		a = true;
		return true
	};
	b._mapMoveendEvent = function(k) {
		if (d.containsBounds(c.getBounds())) {
			return
		}
		var i = c.getBounds(),
			h = i.getSouthWest(),
			g = i.getNorthEast(),
			m = d.getSouthWest(),
			j = d.getNorthEast();
		var l = {
			n: 0,
			e: 0,
			s: 0,
			w: 0
		};
		l.n = (g.lat < j.lat) ? g.lat : j.lat;
		l.e = (g.lng < j.lng) ? g.lng : j.lng;
		l.s = (h.lat < m.lat) ? m.lat : h.lat;
		l.w = (h.lng < m.lng) ? m.lng : h.lng;
		var f = new BMap.Point(l.w + (l.e - l.w) / 2, l.s + (l.n - l.s) / 2);
		if(back){
			setTimeout(function() {
				c.panTo(f, {
					noAnimation: "no"
				})
			}, 1)
		}
	};
	b.clearBounds = function() {
		if (!a) {
			return
		}
		c.removeEventListener("moveend", this._mapMoveendEvent);
		a = false
	}
})();