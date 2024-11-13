


var webstore = new Vue({
    el: '#app',
    data: {
        showinformation: true,
        sitename: 'Lessons Infomation',
        lessons: lessons,
        cart: [],
        user: {

        },
    },

    methods: {

        addtocart: function (lesson) {
            this.cart.push({ ...lesson });
        },
        removeFromCart: function (lesson) {
            let index = this.cart.indexOf(lesson);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        showCheckout() {
            this.showinformation = this.showinformation ? false : true
        },
        spaceLeft(lesson) {
            let countInCart = this.cart.filter(cartLesson => cartLesson.id === lesson.id).length;
            return lesson.Space - countInCart;
        },
        canAddToCart: function (lesson) {
            return this.spaceLeft(lesson) > 0;
        },
        submitForm() {
            if (!this.user.Name || !this.user.Phone) {
                alert('Please fill in all required fields.');
                return;
            }

            alert('Order submitted!');

        }
    },
    computed: {
        cartItemCount: function () {
            return this.cart.length || "";
        },
        totalPrice: function () {
            return this.cart.reduce((sum, lesson) => sum + lesson.Price, 0);
        },

        cartItems: function () {
            // Ensure each lesson appears only once in the cart summary, with its count
            return [...new Set(this.cart)];
        },
        isFormValid() {
            // Check if Name and Phone are not empty
            return this.user.Name && this.user.Phone;
        }


    }
})