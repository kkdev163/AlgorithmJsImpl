window.sorting = {
  less: function(a, b) {
    if (!a.compareTo || typeof a.compareTo !== 'function') {
      throw('a should implement compareTo function')
    }
    return a.compareTo(b) < 0
  },
  exch: function(arr, a, b){
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp 
  },
  isSort: function(arr) {
    for (var i = 1; i < arr.length; i++) {
      if(this.less(arr[i], arr[i-1])) return false
    }
    return true
  },
  show: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i].toString())
    }
  },
  sortCompare: function() {

  },
  // 选择排序
  selectSorting: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      let min = i
      for (var j = i+1; j < arr.length; j++) {
        if(this.less(arr[j], arr[min])) {
          min = j
        }
      }
      this.exch(arr, i, min)
    }
  },
  // 插入排序
  insertSorting: function(arr) {
    for (var i = 1; i < arr.length; i++) {
      // 将 a[i] 插入到 a[i-1] a[i-2]...之中
      for (var j = i; j>0 && this.less(arr[j], arr[j-1]); j--) {
        this.exch(arr, j, j-1)
      }
    }
  },
  // 冒泡排序
  bubbleSorting: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = arr.length-1; j > i; j--) {
        if (this.less(arr[j], arr[j-1])) {
          this.exch(arr, j ,j-1)
        }
      }
    }
  },
  // 希尔排序
  shellSorting: function(arr) {
    let N = arr.length
    let n = 1
    while(n < N/3) {
      n = n * 3 +1  // 1, 4, 13, 40...
    } 
    while(n>=1) {
      for (var i = n; i < arr.length; i++) {
        for (var j = i; j>=n && this.less(arr[j], arr[j-n]); j-=n) {
          this.exch(arr, j, j-n)
        }
      }
      n = parseInt(n/3)
    }
  }
}

window.sortCompare = {
  time(alg, arr) {
    let startTime = Date.now()
    alg.call(sorting, arr)
    return Date.now() - startTime
  },
  timeRandomInput(alg, N , T) {
    let total = 0
    arr = new Array(N)
    for (var t = 0; t < T; t++) {
      for (var i = 0; i < N; i++) {
        arr[i] = Num.prototype.randomNum(1)
      }
      // console.log(alg.name, arr)
      total += this.time(alg, arr)
      // console.log(arr)
      Num.prototype.clearPool()
    }
    return total
  },
  main(alg1, alg2, N, T){
    var t1 = this.timeRandomInput(alg1, N, T)
    var t2 = this.timeRandomInput(alg2, N, T)
    console.log(` ${alg1.name} cost: ${t1}` )
    console.log(` ${alg2.name} cost: ${t2}` )
    console.log(`For ${N} random ${alg1.name} is ${t2/t1} times faster than ${alg2.name}`)
  },
  test(alg1, N , T) {
    var t1 = this.timeRandomInput(alg1, N, T)
    return t1
  }
}

window.Num = function(integer) {
  this.integer = integer
}

Num.prototype.randomPool = []

Num.prototype.compareTo = function(Numb) {
  return this.integer - Numb.integer 
}

Num.prototype.toString = function() {
  return this.integer
}

Num.prototype.uniRandom = function(X) {
  let random  
  do {
    random = X * Math.random()
  }while(this.randomPool.indexOf(random)!=-1)
  this.randomPool.push(random)
  return random
}

Num.prototype.randomNum = function(X) {
  return new Num(this.uniRandom(X))
}

Num.prototype.clearPool = function() {
  this.randomPool = []
}

