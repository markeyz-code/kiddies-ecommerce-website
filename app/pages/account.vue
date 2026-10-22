<template>
  <div>
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">
      
      <!-- LEFT SIDEBAR -->
      <aside class="w-full lg:w-64 flex-shrink-0">
        <div class="lg:sticky lg:top-24 space-y-5 lg:space-y-6">
          <!-- User Greeting -->
          <div>
            <p class="eyebrow mb-1">My account</p>
            <h2 class="font-display text-2xl font-semibold text-brand-900 mb-1">Hello, {{ user?.firstName }}</h2>
            <div class="flex items-center gap-3 text-sm text-brand-500">
              <span class="font-bold text-brand-700">{{ dashboard?.tierInfo?.current || 'Insider' }}</span>
              <span>{{ dashboard?.tierInfo?.points || 0 }} Pts</span>
              <span class="text-xs text-brand-400">Redeem at checkout ①</span>
            </div>
            <div v-if="dashboard?.tierInfo?.nextTier" class="mt-3 bg-cream-100 border border-cream-200 rounded-lg p-3">
              <div class="flex items-center gap-2 text-xs text-brand-500">
                <div class="w-6 h-6 bg-brand-900 rounded-full flex items-center justify-center text-white text-[8px]">↑</div>
                <div>
                  <p class="font-bold text-brand-800">Upgrade to {{ dashboard?.tierInfo?.nextTier }}</p>
                  <p>Spend ${{ dashboard?.tierInfo?.spendToNextTier?.toFixed(2) }} by 08/31/2027</p>
                </div>
                <ChevronRightIcon class="h-4 w-4 ml-auto text-brand-400" />
              </div>
            </div>
          </div>

          <!-- Mobile account menu -->
          <div class="lg:hidden bg-white border border-cream-200 rounded-xl p-3">
            <label for="account-section" class="block text-[10px] font-black uppercase tracking-widest text-brand-400 mb-1">Account Menu</label>
            <select id="account-section" v-model="activeTab" class="w-full border border-cream-300 rounded-lg px-3 py-2.5 text-sm font-bold text-brand-800 bg-white focus:outline-none focus:border-brand-900">
              <optgroup label="Account">
                <option value="overview">Account Overview</option>
                <option value="orders">Orders</option>
              </optgroup>
              <optgroup label="Rewards">
                <option value="rewards">JasmarKids Rewards</option>
                <option value="discounts">Discount & Offers</option>
                <option value="earn-points">Earn Extra Points</option>
                <option value="points-history">Points History</option>
                <option value="credit-card">Rewards Credit Card</option>
              </optgroup>
              <optgroup label="Shopping">
                <option value="reviews">Rate & Review</option>
                <option value="buy-again">Buy it Again</option>
                <option value="wishlists">My Wishlists</option>
              </optgroup>
              <optgroup label="Account Settings">
                <option value="profile">Profile Information</option>
                <option value="addresses">Address Book</option>
                <option value="payments">Payments & Gift Cards</option>
                <option value="preferences">My Preferences</option>
              </optgroup>
            </select>
            <button @click="handleLogout" class="mt-2 w-full text-center px-3 py-2 rounded-lg text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">Sign Out</button>
          </div>

          <!-- Navigation -->
          <nav class="hidden lg:block space-y-1 text-sm">
            <button @click="activeTab = 'overview'" :class="navClass('overview')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Account Overview</button>
            <button @click="activeTab = 'orders'" :class="navClass('orders')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Orders</button>
            
            <div class="pt-2">
              <p class="px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-400">Rewards</p>
              <button @click="activeTab = 'rewards'" :class="navClass('rewards')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">JasmarKids Rewards</button>
              <button @click="activeTab = 'discounts'" :class="navClass('discounts')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Discount & Offers</button>
              <button @click="activeTab = 'earn-points'" :class="navClass('earn-points')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Earn Extra Points</button>
              <button @click="activeTab = 'points-history'" :class="navClass('points-history')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Points History</button>
              <button @click="activeTab = 'credit-card'" :class="navClass('credit-card')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Rewards Credit Card</button>
            </div>

            <div class="pt-2">
              <button @click="activeTab = 'reviews'" :class="navClass('reviews')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Rate & Review</button>
              <button @click="activeTab = 'buy-again'" :class="navClass('buy-again')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Buy it Again</button>
              <button @click="activeTab = 'wishlists'" :class="navClass('wishlists')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">My Wishlists</button>
            </div>

            <div class="pt-2">
              <p class="px-3 py-1 text-xs font-black uppercase tracking-widest text-brand-400">Account Settings</p>
              <button @click="activeTab = 'profile'" :class="navClass('profile')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Profile Information</button>
              <button @click="activeTab = 'addresses'" :class="navClass('addresses')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Address Book</button>
              <button @click="activeTab = 'payments'" :class="navClass('payments')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">Payments & Gift Cards</button>
              <button @click="activeTab = 'preferences'" :class="navClass('preferences')" class="w-full text-left px-3 py-2 rounded font-medium transition-colors">My Preferences</button>
            </div>

            <div class="pt-4 border-t border-cream-200 mt-4">
              <button @click="handleLogout" class="w-full text-left px-3 py-2 rounded font-medium text-red-600 hover:bg-red-50 transition-colors">Sign Out</button>
            </div>
          </nav>
        </div>
      </aside>

      <!-- RIGHT MAIN CONTENT -->
      <main class="flex-1 min-w-0">

        <!-- ============= ACCOUNT OVERVIEW ============= -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <!-- Earn Extra Points -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <StarIcon class="h-5 w-5 text-brand-700" />
              <h3 class="font-display text-xl font-semibold text-brand-900">Earn Extra Points</h3>
              <span class="text-xs text-coral-600 font-bold ml-2 cursor-pointer hover:underline">View all</span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="action in dashboard?.earnPointsActions" :key="action.action" class="bg-white border border-cream-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div class="w-12 h-12 mx-auto bg-cream-100 rounded-xl flex items-center justify-center mb-3">
                  <ClipboardListIcon v-if="action.icon === 'clipboard'" class="h-6 w-6 text-brand-500" />
                  <MailIcon v-else-if="action.icon === 'mail'" class="h-6 w-6 text-brand-500" />
                  <StoreIcon v-else-if="action.icon === 'store'" class="h-6 w-6 text-brand-500" />
                  <CakeIcon v-else class="h-6 w-6 text-brand-500" />
                </div>
                <p class="font-bold text-sm text-brand-900">Earn {{ action.points }} Points</p>
                <p class="text-xs text-brand-500 mt-1">{{ action.action }}</p>
              </div>
            </div>
          </section>

          <!-- Orders -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <PackageIcon class="h-5 w-5 text-brand-700" />
              <h3 class="font-display text-xl font-semibold text-brand-900">Orders</h3>
              <span class="text-xs text-coral-600 font-bold ml-2 cursor-pointer hover:underline" @click="activeTab = 'orders'">View all</span>
            </div>
            <div v-if="orders.length === 0" class="bg-white border border-cream-200 rounded-xl p-8">
              <p class="text-brand-500">No orders have been placed</p>
              <NuxtLink to="/products" class="text-coral-600 font-bold text-sm hover:underline">Shop Now</NuxtLink>
            </div>
            <div v-else class="bg-white border border-cream-200 rounded-xl divide-y divide-gray-100">
              <div v-for="order in orders.slice(0, 2)" :key="order.orderNumber" class="p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p class="font-bold text-sm">{{ order.orderNumber }}</p>
                  <p class="text-xs text-brand-500">{{ new Date(order.createdAt).toLocaleDateString() }}</p>
                </div>
                <p class="font-bold">${{ order.totalAmount?.toFixed(2) }}</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold px-3 py-1 rounded-full" :class="order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Shipped' ? 'bg-brand-100 text-brand-700' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'">{{ order.status }}</span>
                  <span class="text-xs font-bold px-3 py-1 rounded-full" :class="order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-cream-100 text-brand-500'">{{ order.paymentStatus }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Discounts & Offers -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <TagIcon class="h-5 w-5 text-brand-700" />
              <h3 class="font-display text-xl font-semibold text-brand-900">Discounts and Offers</h3>
              <span class="text-xs text-coral-600 font-bold ml-2 cursor-pointer hover:underline" @click="activeTab = 'discounts'">View all</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="disc in dashboard?.discounts" :key="disc.code" class="bg-white border border-cream-200 rounded-xl overflow-hidden">
                <div class="h-2" :class="disc.type === 'savings' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'"></div>
                <div class="p-5">
                  <span class="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white mb-2" :class="disc.type === 'savings' ? 'bg-red-500' : 'bg-brand-500'">{{ disc.type }}</span>
                  <h4 class="font-bold text-sm text-brand-900 mb-1">{{ disc.description }}</h4>
                  <p class="text-xs text-brand-500">Valid thru {{ new Date(disc.validUntil).toLocaleDateString() }}</p>
                  <div class="flex items-center justify-between mt-4">
                    <span class="text-xs text-coral-600 font-bold cursor-pointer hover:underline">Details</span>
                  <button @click="handleApplyDiscount(disc.code)" class="rounded-full border border-brand-900 px-5 py-2.5 text-[11px] font-bold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white">APPLY NOW</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Profile Information -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <UserIcon class="h-5 w-5 text-brand-700" />
              <h3 class="font-display text-xl font-semibold text-brand-900">Profile Information</h3>
              <span class="text-xs text-coral-600 font-bold ml-2 cursor-pointer hover:underline" @click="activeTab = 'profile'">View all</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white border border-cream-200 rounded-xl p-5">
                <h5 class="font-bold text-sm text-brand-900 mb-2">{{ user?.firstName }} {{ user?.lastName }}</h5>
                <p class="text-xs text-brand-500">{{ user?.phoneNumber || 'No phone' }}</p>
                <p class="text-xs text-brand-500">{{ user?.email }}</p>
                <button @click="activeTab = 'profile'" class="text-xs text-coral-600 font-bold mt-3 underline underline-offset-2">Edit</button>
              </div>
              <div class="bg-white border border-cream-200 rounded-xl p-5">
                <h5 class="font-bold text-sm text-brand-900 mb-2">Mailing Address</h5>
                <p v-if="user?.addresses?.length" class="text-xs text-brand-500">{{ user.addresses[0].street }}, {{ user.addresses[0].city }}, {{ user.addresses[0].zipCode }}</p>
                <p v-else class="text-xs text-brand-500">No address saved</p>
                <button @click="activeTab = 'addresses'" class="text-xs text-coral-600 font-bold mt-3 underline underline-offset-2">Edit</button>
              </div>
              <div class="bg-white border border-cream-200 rounded-xl p-5">
                <h5 class="font-bold text-sm text-brand-900 mb-2">Password</h5>
                <p class="text-xs text-brand-500">••••••••</p>
                <NuxtLink to="/forgot-password" class="text-xs text-coral-600 font-bold mt-3 underline underline-offset-2 block">Edit</NuxtLink>
              </div>
            </div>
          </section>

          <!-- Payments -->
          <section>
            <div class="flex items-center gap-2 mb-4">
              <CreditCardIcon class="h-5 w-5 text-brand-700" />
              <h3 class="font-display text-xl font-semibold text-brand-900">Payments & Gift Cards</h3>
              <span class="text-xs text-coral-600 font-bold ml-2 cursor-pointer hover:underline" @click="activeTab = 'payments'">View all</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white border border-cream-200 rounded-xl p-8 text-center cursor-pointer hover:shadow-md transition-shadow">
                <CreditCardIcon class="h-10 w-10 mx-auto text-gray-300 mb-3" />
                <p class="text-sm font-bold text-brand-700">Add a Credit Card</p>
              </div>
              <div class="bg-white border border-cream-200 rounded-xl p-8 text-center cursor-pointer hover:shadow-md transition-shadow">
                <GiftIcon class="h-10 w-10 mx-auto text-gray-300 mb-3" />
                <p class="text-sm font-bold text-brand-700">Add a Gift Card</p>
              </div>
            </div>
          </section>
        </div>

        <!-- ============= ORDERS ============= -->
        <div v-else-if="activeTab === 'orders'" class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <PackageIcon class="h-5 w-5 text-brand-700" />
              <h3 class="font-display text-xl font-semibold text-brand-900">Orders</h3>
            </div>
            <select class="border border-cream-300 rounded px-3 py-1 text-sm font-medium bg-white">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
          </div>
          <p class="text-sm text-brand-500 -mt-2">ORDER HISTORY</p>
          <div v-if="orders.length === 0" class="bg-white border rounded-xl p-8 text-center">
            <p class="text-brand-500">Recent orders will display here. For orders older than 6 months, modify your filter selection.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="order in orders" :key="order.orderNumber" class="bg-white border border-cream-200 rounded-xl p-6">
              <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p class="text-xs text-brand-500">Order placed</p>
                  <p class="font-bold text-sm">{{ new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                </div>
                <div><p class="text-xs text-brand-500">Total</p><p class="font-bold">${{ order.totalAmount?.toFixed(2) }}</p></div>
                <div><p class="text-xs text-brand-500">Order #</p><p class="font-bold text-sm">{{ order.orderNumber }}</p></div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold px-3 py-1 rounded-full" :class="order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Shipped' ? 'bg-brand-100 text-brand-700' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'">{{ order.status }}</span>
                  <span class="text-xs font-bold px-3 py-1 rounded-full" :class="order.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-cream-100 text-brand-500'">{{ order.paymentStatus }}</span>
                </div>
              </div>
              <div v-if="order.status === 'Pending' || order.status === 'Processing'" class="flex justify-end mb-3">
                <button @click="cancelOrder(order)" class="text-xs font-bold text-red-600 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors">
                  Cancel order
                </button>
              </div>
              <div class="flex gap-4 flex-wrap">
                <div v-for="item in order.items" :key="item.name" class="flex gap-3">
                  <div class="w-16 h-20 bg-cream-100 rounded flex items-center justify-center overflow-hidden">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" loading="lazy" />
                    <ShoppingBagIcon v-else class="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <p class="font-medium text-sm">{{ item.name }}</p>
                    <p class="text-xs text-brand-500">Qty: {{ item.quantity }}</p>
                    <p class="font-bold text-sm">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t flex gap-3">
                <button @click="printInvoice(order)" class="border border-cream-300 rounded px-4 py-2 text-xs font-bold hover:bg-cream-100">View Invoice</button>
                <button @click="buyAgain(order)" class="bg-brand-900 text-white rounded px-4 py-2 text-xs font-bold hover:bg-black">Buy Again</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ============= MY PLACE REWARDS ============= -->
        <div v-else-if="activeTab === 'rewards'" class="space-y-8">
          <div class="text-center">
            <h2 class="text-3xl font-black italic text-brand-900">Rewards <span class="border border-brand-200 rounded px-2 py-0.5 text-sm not-italic uppercase tracking-widest">Rewards</span></h2>
            <p class="text-sm text-brand-500 mt-2">Check your points, discover new rewards, and make the most of every purchase.</p>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-black">{{ dashboard?.tierInfo?.points || 0 }} Pts</p>
              <p class="text-sm text-brand-500">Points Balance</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-sm text-brand-700">100 Points = $5</p>
              <p class="text-xs text-brand-500">Redeem at checkout</p>
            </div>
          </div>

          <!-- Tier Progress -->
          <div class="bg-white border border-cream-200 rounded-xl p-6">
            <div class="flex items-center gap-4 mb-4">
              <span class="border border-gray-900 rounded-full px-4 py-1 text-xs font-bold uppercase">{{ dashboard?.tierInfo?.current }}</span>
              <span class="text-xs text-brand-500">VALID TILL 08/31/2027</span>
            </div>
            <p class="text-xs text-brand-500 mb-4">Spend ${{ dashboard?.tierInfo?.spendToNextTier?.toFixed(2) || '175.00' }} by 08/31/2027 to reach {{ dashboard?.tierInfo?.nextTier || 'Stylist' }} and unlock more benefits.</p>
            <div class="relative h-2 bg-cream-200 rounded-full overflow-hidden">
              <div class="absolute left-0 top-0 h-full bg-brand-900 rounded-full transition-all" :style="{ width: tierProgressPercent + '%' }"></div>
            </div>
            <div class="flex justify-between text-[10px] text-brand-500 mt-2 uppercase tracking-wider font-bold">
              <span>Insider $0</span>
              <span>Stylist ${{ dashboard?.tierInfo?.thresholds?.stylist || 175 }}</span>
              <span>Icon ${{ dashboard?.tierInfo?.thresholds?.icon || 500 }}</span>
            </div>
          </div>

          <!-- Your Perks -->
          <div class="text-center">
            <h3 class="font-display text-xl font-semibold text-brand-900">Your Perks</h3>
            <p class="text-sm text-brand-500">Make the most of your tier—here's what you can still enjoy</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white border rounded-xl p-6 text-center">
              <GiftIcon class="h-8 w-8 mx-auto text-brand-500 mb-3" />
              <p class="font-bold text-sm">1 Free Standard Gift Service</p>
              <p class="text-xs text-brand-500 mt-1">One free standard gift services, on us.</p>
            </div>
            <div class="bg-white border rounded-xl p-6 text-center">
              <SparklesIcon class="h-8 w-8 mx-auto text-red-500 mb-3" />
              <p class="font-bold text-sm">Priority to VIP Events and Offers</p>
              <p class="text-xs text-brand-500 mt-1">Get early access to VIP events and exclusive offers.</p>
            </div>
            <div class="bg-white border rounded-xl p-6 text-center">
              <ZapIcon class="h-8 w-8 mx-auto text-amber-500 mb-3" />
              <p class="font-bold text-sm">Priority to Early Access Sales</p>
              <p class="text-xs text-brand-500 mt-1">Enjoy first dibs on sales—just for members like you.</p>
            </div>
          </div>

          <!-- Boost Your Points -->
          <div class="text-center">
            <h3 class="font-display text-xl font-semibold text-brand-900">Boost Your Points</h3>
            <p class="text-sm text-brand-500">More points mean more rewards – don't miss your chance</p>
          </div>
          <div class="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4">
            <div v-for="action in dashboard?.earnPointsActions" :key="action.action" class="flex-shrink-0 bg-brand-900 text-white rounded-lg px-6 py-3 text-sm font-bold cursor-pointer hover:bg-black transition-colors">
              Earn {{ action.points }} Points
            </div>
            <div class="flex-shrink-0 bg-brand-900 text-white rounded-lg px-6 py-3 text-sm font-bold cursor-pointer hover:bg-black transition-colors">Earn 5 Points</div>
            <div class="flex-shrink-0 bg-brand-900 text-white rounded-lg px-6 py-3 text-sm font-bold cursor-pointer hover:bg-black transition-colors">Earn 5 Points</div>
            <div class="flex-shrink-0 bg-brand-900 text-white rounded-lg px-6 py-3 text-sm font-bold cursor-pointer hover:bg-black transition-colors">Earn 5 Points</div>
            <div class="flex-shrink-0 bg-brand-900 text-white rounded-lg px-6 py-3 text-sm font-bold cursor-pointer hover:bg-black transition-colors">Earn 5 Points</div>
          </div>
        </div>

        <!-- ============= DISCOUNTS & OFFERS ============= -->
        <div v-else-if="activeTab === 'discounts'" class="space-y-6">
          <div class="flex items-center gap-2">
            <TagIcon class="h-5 w-5 text-brand-700" />
            <h3 class="font-display text-xl font-semibold text-brand-900">Discounts and Offers</h3>
          </div>
          <p class="text-sm text-brand-500">Available Discounts and offers ({{ dashboard?.discounts?.length || 0 }})</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="disc in dashboard?.discounts" :key="disc.code" class="bg-white border border-cream-200 rounded-xl overflow-hidden">
              <div class="h-2" :class="disc.type === 'savings' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'"></div>
              <div class="p-5">
                <span class="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white mb-2" :class="disc.type === 'savings' ? 'bg-red-500' : 'bg-brand-500'">{{ disc.type }}</span>
                <h4 class="font-bold text-sm text-brand-900 mb-1">{{ disc.code }} – {{ disc.description }}</h4>
                <p class="text-xs text-brand-500">Valid thru {{ new Date(disc.validUntil).toLocaleDateString() }}</p>
                <div class="flex items-center justify-between mt-4">
                  <span class="text-xs text-coral-600 font-bold cursor-pointer hover:underline">Details</span>
                  <button @click="handleApplyDiscount(disc.code)" class="rounded-full border border-brand-900 px-5 py-2.5 text-[11px] font-bold text-brand-900 transition-colors hover:bg-brand-900 hover:text-white">APPLY NOW</button>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center text-sm text-brand-500 pt-4 space-x-4">
            <NuxtLink to="/terms" class="text-coral-600 underline">Program Details</NuxtLink>
            <NuxtLink to="/terms" class="text-coral-600 underline">Terms & Conditions</NuxtLink>
          </div>
        </div>

        <!-- ============= PROFILE INFORMATION ============= -->
        <div v-else-if="activeTab === 'profile'" class="space-y-8">
          <h3 class="font-display text-xl font-semibold text-brand-900">PROFILE INFORMATION</h3>
          
          <div class="border-t-2 border-black pt-6 flex flex-col md:flex-row gap-12">
            <!-- Left Side: Complete Your Profile -->
            <div class="w-full md:w-1/2 space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-brand-900">Complete Your Profile</h4>
                  <p class="text-xs text-brand-500">Improve your shopping experience by adding even more info.</p>
                </div>
                <div class="relative w-12 h-12">
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200" stroke-width="3"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-black" stroke-width="3" stroke-dasharray="100 100" stroke-dashoffset="80"></circle>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center font-bold text-xs text-black">20%</div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="border border-cream-300 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow">
                  <HeartIcon class="h-6 w-6 text-brand-500 mb-2" />
                  <span class="font-bold text-xs">+10 point</span>
                  <span class="text-xs text-brand-500">Add Mailing Address</span>
                </div>
                <div class="border border-cream-300 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow">
                  <StoreIcon class="h-6 w-6 text-brand-500 mb-2" />
                  <span class="font-bold text-xs">+10 point</span>
                  <span class="text-xs text-brand-500">Add Your Favorite Store</span>
                </div>
                <div class="border border-cream-300 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow">
                  <CakeIcon class="h-6 w-6 text-brand-500 mb-2" />
                  <span class="font-bold text-xs">+10 point</span>
                  <span class="text-xs text-brand-500">Add Your Birthday</span>
                </div>
                <div class="border border-cream-300 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow">
                  <ClipboardListIcon class="h-6 w-6 text-brand-500 mb-2" />
                  <span class="font-bold text-xs">+10 point</span>
                  <span class="text-xs text-brand-500">Take A 6-Second Survey</span>
                </div>
              </div>
            </div>

            <!-- Right Side: Personal Info -->
            <div class="w-full md:w-1/2 space-y-6">
              <div>
                <h4 class="font-bold text-brand-900 mb-2">Personal Information</h4>
                <div v-if="!isEditingProfile" class="text-sm text-brand-500 space-y-1">
                  <p>{{ user?.firstName }} {{ user?.lastName }}</p>
                  <p>{{ user?.email }}</p>
                  <p v-if="user?.phoneNumber">{{ user?.phoneNumber }}</p>
                  <p class="mt-4">JasmarKids Rewards # B31788247691406</p>
                </div>
                <div v-else class="space-y-4">
                  <div><label class="text-xs font-bold text-brand-500 block mb-1">First Name</label><input v-model="profileForm.firstName" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                  <div><label class="text-xs font-bold text-brand-500 block mb-1">Last Name</label><input v-model="profileForm.lastName" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                  <div><label class="text-xs font-bold text-brand-500 block mb-1">Phone Number</label><input v-model="profileForm.phoneNumber" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                  <div><label class="text-xs font-bold text-brand-500 block mb-1">Zip Code</label><input v-model="profileForm.zipCode" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                </div>
              </div>
              <button v-if="!isEditingProfile" @click="isEditingProfile = true" class="w-full bg-brand-900 text-white font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-black transition-colors">EDIT PERSONAL INFO</button>
              <div v-else class="flex gap-2">
                <button @click="handleUpdateProfile" class="w-full bg-brand-900 text-white font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-black transition-colors">SAVE CHANGES</button>
                <button @click="isEditingProfile = false" class="w-full bg-cream-200 text-brand-800 font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-gray-300 transition-colors">CANCEL</button>
              </div>
            </div>
          </div>

          <!-- Bottom Section: Password & Birthday -->
          <div class="border-t border-cream-200 pt-6 flex flex-col md:flex-row gap-12">
            <div class="w-full md:w-1/2 space-y-4">
              <h4 class="font-bold text-brand-900">Password</h4>
              <div v-if="!showPasswordForm">
                <p class="font-bold text-xs">Need to change your password?</p>
                <p class="text-xs text-brand-500 leading-relaxed mb-2">Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character. It cannot be your email address or a recently used password.</p>
                <button @click="showPasswordForm = true" class="w-full bg-brand-900 text-white font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-black transition-colors mt-2">CHANGE PASSWORD</button>
              </div>
              <form v-else @submit.prevent="handleChangePassword" class="space-y-4">
                <div><label class="text-xs font-bold text-brand-500 block mb-1">Current Password</label><input type="password" v-model="passwordForm.currentPassword" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                <div><label class="text-xs font-bold text-brand-500 block mb-1">New Password</label><input type="password" v-model="passwordForm.newPassword" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                <div class="flex gap-2">
                  <button type="submit" class="w-full bg-brand-900 text-white font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-black transition-colors">UPDATE</button>
                  <button type="button" @click="showPasswordForm = false" class="w-full bg-cream-200 text-brand-800 font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-gray-300 transition-colors">CANCEL</button>
                </div>
              </form>
            </div>
            
            <div class="w-full md:w-1/2 space-y-4">
              <h4 class="font-bold text-brand-900">Birthday Savings</h4>
              
              <div v-if="user?.birthdays?.length" class="space-y-2 mb-4">
                <div v-for="(bday, i) in user.birthdays" :key="i" class="flex items-center justify-between border-b pb-2">
                  <div>
                    <p class="font-bold text-sm">{{ bday.childName }}</p>
                    <p class="text-xs text-brand-500">{{ new Date(bday.birthDate).toLocaleDateString() }}</p>
                  </div>
                  <button @click="removeBirthday(i)" class="text-xs text-red-600 font-bold hover:underline">Remove</button>
                </div>
              </div>
              
              <div v-if="!showBirthdayForm">
                <p class="text-xs text-brand-500 leading-relaxed mb-2">Add up to 4 kids' birthdays to your account and receive special savings during their birthday month!</p>
                <button v-if="(user?.birthdays?.length || 0) < 4" @click="showBirthdayForm = true" class="w-full bg-brand-900 text-white font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-black transition-colors mt-2">ADD BIRTHDAY INFO</button>
              </div>
              <form v-else @submit.prevent="handleAddBirthday" class="space-y-4">
                <div><label class="text-xs font-bold text-brand-500 block mb-1">Child's Name</label><input v-model="birthdayForm.childName" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                <div><label class="text-xs font-bold text-brand-500 block mb-1">Birth Date</label><input type="date" v-model="birthdayForm.birthDate" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
                <div class="flex gap-2">
                  <button type="submit" class="w-full bg-brand-900 text-white font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-black transition-colors">SAVE</button>
                  <button type="button" @click="showBirthdayForm = false" class="w-full bg-cream-200 text-brand-800 font-bold py-3 text-xs tracking-wider rounded-sm hover:bg-gray-300 transition-colors">CANCEL</button>
                </div>
              </form>
            </div>
          </div>
          
          <div class="flex justify-center gap-12 text-xs text-brand-500 pt-8 pb-12">
            <NuxtLink to="/terms" class="underline">Program Details</NuxtLink>
            <NuxtLink to="/terms" class="underline">Terms & Conditions</NuxtLink>
          </div>
        </div>

        <!-- ============= ADDRESS BOOK ============= -->
        <div v-else-if="activeTab === 'addresses'" class="space-y-6">
          <h3 class="font-display text-xl font-semibold text-brand-900">Address Book</h3>
          <div v-if="user?.addresses?.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(addr, i) in user.addresses" :key="i" class="bg-white border rounded-xl p-5 relative">
              <span v-if="addr.isDefault" class="absolute top-3 right-3 bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded">Default</span>
              <p class="font-bold text-sm">{{ addr.firstName }} {{ addr.lastName }}</p>
              <p class="text-xs text-brand-500 mt-1">{{ addr.street }}{{ addr.apt ? ', ' + addr.apt : '' }}</p>
              <p class="text-xs text-brand-500">{{ addr.city }}, {{ addr.state }} {{ addr.zipCode }}</p>
              <p class="text-xs text-brand-500">{{ addr.country }}</p>
              <button @click="removeAddress(i)" class="text-xs text-red-500 font-bold mt-3 hover:underline">Remove</button>
            </div>
          </div>
          <button @click="showAddressForm = !showAddressForm" class="border border-cream-300 rounded px-4 py-2 text-sm font-bold hover:bg-cream-100">+ Add New Address</button>
          <form v-if="showAddressForm" @submit.prevent="handleAddAddress" class="bg-white border rounded-xl p-6 space-y-4 max-w-xl">
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-xs font-bold text-brand-500 block mb-1">First Name</label><input v-model="addressForm.firstName" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
              <div><label class="text-xs font-bold text-brand-500 block mb-1">Last Name</label><input v-model="addressForm.lastName" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
            </div>
            <div><label class="text-xs font-bold text-brand-500 block mb-1">Street Address</label><input v-model="addressForm.street" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-xs font-bold text-brand-500 block mb-1">City</label><input v-model="addressForm.city" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
              <div><label class="text-xs font-bold text-brand-500 block mb-1">State</label><input v-model="addressForm.state" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-xs font-bold text-brand-500 block mb-1">Zip Code</label><input v-model="addressForm.zipCode" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
              <div><label class="text-xs font-bold text-brand-500 block mb-1">Country</label><input v-model="addressForm.country" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" /></div>
            </div>
            <label class="flex items-center gap-2 text-sm"><input type="checkbox" v-model="addressForm.isDefault" class="rounded" /> Set as default</label>
            <button type="submit" class="bg-brand-900 text-white font-bold px-8 py-3 rounded hover:bg-black transition-colors text-sm">Save Address</button>
          </form>
        </div>

        <!-- ============= PAYMENTS & GIFT CARDS ============= -->
        <!-- ============= PAYMENTS & GIFT CARDS ============= -->
        <div v-else-if="activeTab === 'payments'" class="space-y-10">
          <div>
            <h3 class="font-display text-lg font-semibold text-brand-900 border-b border-cream-200 pb-2 mb-6">CREDIT & DEBIT CARDS</h3>
            
            <div v-if="user?.paymentMethods?.length" class="mb-6 space-y-4">
              <div v-for="(pm, i) in user.paymentMethods" :key="i" class="border p-4 rounded-xl flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-8 bg-cream-200 rounded flex items-center justify-center text-[10px] font-bold">{{ pm.brand }}</div>
                  <div>
                    <p class="font-bold text-sm">•••• •••• •••• {{ pm.last4 }}</p>
                    <p class="text-xs text-brand-500">Expires {{ pm.expiryMonth }}/{{ pm.expiryYear }}</p>
                  </div>
                </div>
                <button @click="removePayment(i)" class="text-xs text-red-600 font-bold hover:underline">Remove</button>
              </div>
            </div>
            
            <div v-if="!showPaymentForm" class="flex items-start gap-4">
              <CreditCardIcon class="h-10 w-10 text-brand-500 shrink-0" />
              <div>
                <p class="font-bold text-sm text-brand-900 mb-1">Add a credit or debit card to check out faster!</p>
                <p class="text-xs text-brand-500 mb-4">Securely save your credit card, and/or JasmarKids Rewards Card information so you can check out even faster!</p>
                <button @click="showPaymentForm = true" class="bg-brand-900 text-white text-xs font-bold px-8 py-3 rounded-sm hover:bg-black uppercase tracking-widest transition-colors w-[300px]">ADD A CREDIT OR DEBIT CARD</button>
              </div>
            </div>
            
            <form v-else @submit.prevent="handleAddPayment" class="mt-6 bg-white border rounded-xl p-6 space-y-4 max-w-xl">
              <div><label class="text-xs font-bold text-brand-500 block mb-1">Card Number (Last 4)</label><input v-model="paymentForm.last4" required maxlength="4" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" placeholder="1234" /></div>
              <div class="grid grid-cols-2 gap-4">
                <div><label class="text-xs font-bold text-brand-500 block mb-1">Expiry Month</label><input type="number" min="1" max="12" v-model="paymentForm.expiryMonth" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" placeholder="12" /></div>
                <div><label class="text-xs font-bold text-brand-500 block mb-1">Expiry Year</label><input type="number" min="2024" v-model="paymentForm.expiryYear" required class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200" placeholder="2026" /></div>
              </div>
              <div><label class="text-xs font-bold text-brand-500 block mb-1">Brand</label><select v-model="paymentForm.brand" class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-brand-200"><option value="Visa">Visa</option><option value="Mastercard">Mastercard</option><option value="Amex">Amex</option></select></div>
              <div class="flex gap-2">
                <button type="submit" class="bg-brand-900 text-white font-bold px-8 py-3 rounded hover:bg-black transition-colors text-sm">Save Card</button>
                <button type="button" @click="showPaymentForm = false" class="bg-cream-200 text-brand-800 font-bold px-8 py-3 rounded hover:bg-gray-300 transition-colors text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- ============= MY PREFERENCES ============= -->
        <div v-else-if="activeTab === 'preferences'" class="space-y-6">
          <h3 class="font-display text-xl font-semibold text-brand-900">My Preferences</h3>
          <div class="bg-white border rounded-xl p-6 space-y-5 max-w-xl">
            <label class="flex items-center justify-between">
              <span class="text-sm font-medium text-brand-700">Email Offers & Promotions</span>
              <input type="checkbox" v-model="prefsForm.emailOffers" class="rounded text-brand-900 focus:ring-blue-900" />
            </label>
            <label class="flex items-center justify-between">
              <span class="text-sm font-medium text-brand-700">SMS Text Alerts (Get 30% OFF!)</span>
              <input type="checkbox" v-model="prefsForm.smsAlerts" class="rounded text-brand-900 focus:ring-blue-900" />
            </label>
            <button @click="handleUpdatePreferences" class="bg-brand-900 text-white font-bold px-8 py-3 rounded hover:bg-black transition-colors text-sm">Save Preferences</button>
          </div>
        </div>

        <!-- ============= WISHLISTS ============= -->
        <div v-else-if="activeTab === 'wishlists'" class="space-y-6">
          <div>
            <h3 class="font-display text-xl font-semibold text-brand-900 inline-block mr-2">Wishlists</h3>
            <span class="text-xs text-brand-500 font-bold">1/5 Lists</span>
            <p class="text-xs text-brand-900 font-bold mt-1">Create, edit, and share up to 5 wishlists.</p>
          </div>
          
          <div class="flex items-center justify-between py-4 border-b">
            <div class="flex items-center gap-2 cursor-pointer">
              <HeartIcon class="h-4 w-4 text-red-600 fill-current" />
              <span class="text-coral-600 font-bold text-sm">Marquis's Favorites</span>
              <ChevronRightIcon class="h-4 w-4 text-coral-600 transform rotate-90" />
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-cream-100 p-2 rounded-full hover:bg-cream-200"><span class="block w-4 h-4 text-center leading-none text-xs">✏️</span></button>
              <button class="bg-cream-100 p-2 rounded-full hover:bg-cream-200"><span class="block w-4 h-4 text-center leading-none text-xs">🔗</span></button>
              <button class="flex items-center gap-1 bg-cream-100 px-3 py-1.5 rounded-full hover:bg-cream-200 text-xs font-bold"><span class="text-lg leading-none">+</span> Create</button>
            </div>
          </div>
          
          <div class="flex items-center justify-between py-2 text-xs font-bold">
            <div class="flex items-center gap-6 text-brand-700">
              <span class="cursor-pointer">Display By: All ⌄</span>
              <span class="cursor-pointer">Sort By: Recently Added ⌄</span>
            </div>
            <span class="text-brand-500">8 Items</span>
          </div>

          <div v-if="!user?.wishlist?.length" class="text-center py-16">
            <p class="text-sm font-bold text-brand-900">Your wishlist is empty</p>
            <NuxtLink to="/products" class="inline-block bg-brand-900 text-white text-xs font-bold px-12 py-3 mt-4 rounded-sm hover:bg-black tracking-widest uppercase transition-colors">Start Shopping</NuxtLink>
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <ProductCard v-for="product in wishlistProducts" :key="product._id" :product="product" @quickView="openQuickView" />
          </div>
        </div>

        <!-- ============= BUY IT AGAIN ============= -->
        <div v-else-if="activeTab === 'buy-again'" class="space-y-6">
          <div class="border-b pb-4">
            <h3 class="font-display text-xl font-semibold text-brand-900">BUY IT AGAIN</h3>
            <p class="text-xs text-brand-900 font-bold mt-1">Save time & shop your previously-purchased styles.</p>
          </div>
          
          <div v-if="orders.length === 0" class="text-center py-16">
            <p class="text-sm font-bold text-brand-900">Once you've made an order, you'll be able to shop previously-purchased styles.</p>
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="item in pastItems" :key="item.name" class="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <div class="w-full aspect-square bg-cream-100 rounded-lg mb-3 flex items-center justify-center">
                <ShoppingBagIcon class="h-8 w-8 text-gray-300" />
              </div>
              <p class="font-bold text-xs text-brand-900 truncate">{{ item.name }}</p>
              <p class="font-bold text-sm mt-1">${{ item.price?.toFixed(2) }}</p>
              <button @click="handleAddToCart(item)" class="mt-2 bg-brand-900 text-white text-xs font-bold px-4 py-2 rounded hover:bg-black w-full">Add to Cart</button>
            </div>
          </div>
        </div>

        <!-- ============= RATE & REVIEW ============= -->
        <div v-else-if="activeTab === 'reviews'" class="space-y-6">
          <h3 class="font-display text-xl font-semibold text-brand-900 border-b border-cream-200 pb-4">Rate & Review</h3>
          <div class="text-center py-16">
            <p class="text-sm font-bold text-brand-900 mb-6">Add a review with details and ratings on items you've purchased when they start to appear.</p>
            <NuxtLink to="/products" class="inline-block bg-brand-900 text-white text-xs font-bold px-12 py-3 rounded-sm hover:bg-black tracking-widest uppercase transition-colors">SHOP NOW</NuxtLink>
          </div>
        </div>

        <!-- ============= GENERIC PLACEHOLDER TABS ============= -->
        <div v-else class="space-y-6">
          <h3 class="font-display text-xl font-semibold text-brand-900 border-b border-cream-200 pb-4">{{ activeTab.replace(/-/g, ' ') }}</h3>
          <div class="bg-white border rounded-xl p-12 text-center">
            <SparklesIcon class="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p class="text-brand-500 font-medium">Coming soon! This feature is under development.</p>
          </div>
        </div>

      </main>
    </div>
  </div>

  <QuickViewModal 
    v-if="isQuickViewOpen" 
    :product="selectedProduct" 
    @close="isQuickViewOpen = false" 
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/modules/auth/useAuth';
import { authApi } from '@/api_factory/modules/auth';
import { ordersApi } from '@/api_factory/modules/orders';
import Header from '@/components/Header.vue';
import {
  StarIcon, PackageIcon, TagIcon, UserIcon, CreditCardIcon, GiftIcon, HeartIcon,
  ChevronRightIcon, ClipboardListIcon, MailIcon, StoreIcon, CakeIcon,
  ShoppingBagIcon, SparklesIcon, ZapIcon, RefreshCwIcon
} from 'lucide-vue-next';
import { useCustomToast } from '~/composables/core/useCustomToast';
import { useCart } from '~/composables/core/useCart';
import { useStoreSettings } from '~/composables/core/useStoreSettings';

const router = useRouter();
const route = useRoute();
const { user, fetchProfile, logout } = useAuth();
const { showToast } = useCustomToast();
const cart = useCart();
const { settings: storeSettings, fetchStoreSettings } = useStoreSettings();

const activeTab = ref('overview');
const dashboard = ref(null);
const orders = ref([]);
const wishlistProducts = ref([]);
const showAddressForm = ref(false);
const isEditingProfile = ref(false);
const showPaymentForm = ref(false);
const showPasswordForm = ref(false);
const showBirthdayForm = ref(false);

const profileForm = ref({ firstName: '', lastName: '', phoneNumber: '', zipCode: '' });
const addressForm = ref({ firstName: '', lastName: '', street: '', apt: '', city: '', state: '', zipCode: '', country: 'United States', isDefault: false });
const paymentForm = ref({ last4: '', expiryMonth: '', expiryYear: '', brand: 'Visa' });
const prefsForm = ref({ emailOffers: true, smsAlerts: false });
const passwordForm = ref({ currentPassword: '', newPassword: '' });
const birthdayForm = ref({ childName: '', birthDate: '' });

const tierProgressPercent = computed(() => {
  if (!dashboard.value?.tierInfo) return 0;
  const spent = dashboard.value.tierInfo.totalSpent || 0;
  const iconThreshold = dashboard.value.tierInfo.thresholds?.icon || 500;
  return Math.min(100, (spent / iconThreshold) * 100);
});

const pastItems = computed(() => {
  const items = [];
  const seen = new Set();
  for (const order of orders.value) {
    for (const item of order.items || []) {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        items.push(item);
      }
    }
  }
  return items.slice(0, 8);
});

const navClass = (tab) => {
  return activeTab.value === tab
    ? 'bg-brand-50 text-brand-700 font-bold'
    : 'text-brand-500 hover:bg-cream-100';
};

onMounted(async () => {
  fetchStoreSettings();
  // Read tab from query param
  if (route.query.tab) {
    activeTab.value = route.query.tab;
  }

  const profile = await fetchProfile();
  if (!profile) {
    router.push('/login?redirect=/account');
    return;
  }
  profileForm.value = {
    firstName: user.value?.firstName || '',
    lastName: user.value?.lastName || '',
    phoneNumber: user.value?.phoneNumber || '',
    zipCode: user.value?.zipCode || '',
  };
  prefsForm.value = {
    emailOffers: user.value?.preferences?.emailOffers ?? true,
    smsAlerts: user.value?.preferences?.smsAlerts ?? false,
  };

  try {
    const { data } = await authApi.getDashboard();
    dashboard.value = data;
  } catch (e) {
    console.error('Dashboard load error:', e);
  }

  try {
    const { data } = await authApi.getMyOrders();
    orders.value = data;
  } catch (e) {
    console.error('Orders load error:', e);
  }

  // Fetch wishlist products
  if (user.value?.wishlist?.length) {
    try {
      const { productsApi } = await import('~/api_factory/modules/products');
      const promises = user.value.wishlist.map(id => productsApi.getProductById(id));
      const results = await Promise.all(promises);
      wishlistProducts.value = results.map(res => res.data);
    } catch (e) {
      console.error('Wishlist load error:', e);
    }
  }
});

watch(() => user.value?.wishlist, async (newWishlist) => {
  if (newWishlist?.length) {
    try {
      const { productsApi } = await import('~/api_factory/modules/products');
      const promises = newWishlist.map(id => productsApi.getProductById(id));
      const results = await Promise.all(promises);
      wishlistProducts.value = results.map(res => res.data);
    } catch (e) {
      console.error('Wishlist load error:', e);
    }
  } else {
    wishlistProducts.value = [];
  }
}, { deep: true });

const handleUpdateProfile = async () => {
  try {
    const { data } = await authApi.updateProfile(profileForm.value);
    user.value = data;
    isEditingProfile.value = false;
    showToast('Profile successfully updated!');
  } catch (e) {
    showToast('Error updating profile');
  }
};

const handleAddAddress = async () => {
  try {
    const { data } = await authApi.addAddress(addressForm.value);
    user.value.addresses = data;
    addressForm.value = { firstName: '', lastName: '', street: '', apt: '', city: '', state: '', zipCode: '', country: 'United States', isDefault: false };
    showAddressForm.value = false;
    showToast('Address added!');
  } catch (e) {
    showToast('Error adding address');
  }
};

const removeAddress = async (index) => {
  try {
    const { data } = await authApi.removeAddress(index);
    user.value.addresses = data;
    showToast('Address removed!');
  } catch (e) {
    showToast('Error removing address');
  }
};

const handleAddPayment = async () => {
  try {
    const { data } = await authApi.addPaymentMethod(paymentForm.value);
    user.value.paymentMethods = data;
    showPaymentForm.value = false;
    paymentForm.value = { last4: '', expiryMonth: '', expiryYear: '', brand: 'Visa' };
    showToast('Card saved successfully!');
  } catch (e) {
    showToast('Error saving card');
  }
};

const removePayment = async (index) => {
  try {
    const { data } = await authApi.removePaymentMethod(index);
    user.value.paymentMethods = data;
    showToast('Card removed!');
  } catch (e) {
    showToast('Error removing card');
  }
};

const handleUpdatePreferences = async () => {
  try {
    await authApi.updatePreferences(prefsForm.value);
    showToast('Preferences saved successfully!');
  } catch (e) {
    showToast('Error saving preferences');
  }
};

const handleAddToCart = (item) => {
  const productId = item.productId || item._id || item.id;
  cart.addToCart({
    _id: productId,
    id: productId,
    name: item.name,
    basePrice: item.price ?? item.basePrice ?? 0,
    price: item.price ?? item.basePrice ?? 0,
    sku: item.sku || '',
    image: item.image || item.imageUrls?.thumbnail || '',
    imageUrls: item.imageUrls
  }, 1, item.size ? { size: item.size } : {});
  showToast({ title: 'Added to Cart', message: `${item.name} added to your cart!`, toastType: 'success' });
};

const handleChangePassword = async () => {
  try {
    await authApi.changePassword(passwordForm.value);
    showToast('Password successfully changed!');
    showPasswordForm.value = false;
    passwordForm.value = { currentPassword: '', newPassword: '' };
  } catch (e) {
    showToast(e?.response?.data?.message || 'Error changing password', 'error');
  }
};

const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);

const openQuickView = (product) => {
  selectedProduct.value = product;
  isQuickViewOpen.value = true;
};

const handleAddBirthday = async () => {
  try {
    const { data } = await authApi.addBirthday(birthdayForm.value);
    user.value.birthdays = data;
    showToast('Birthday added!');
    showBirthdayForm.value = false;
    birthdayForm.value = { childName: '', birthDate: '' };
  } catch (e) {
    showToast(e.response?.data?.message || 'Error adding birthday');
  }
};

const removeBirthday = async (index) => {
  try {
    const { data } = await authApi.removeBirthday(index);
    user.value.birthdays = data;
    showToast('Birthday removed!');
  } catch (e) {
    showToast('Error removing birthday');
  }
};

const cancelOrder = async (order) => {
  if (!confirm(`Cancel order ${order.orderNumber}?`)) return;
  try {
    await ordersApi.cancelOrder(order._id);
    const { data } = await authApi.getMyOrders();
    orders.value = data;
    showToast({ title: 'Order Cancelled', message: 'Your order has been cancelled.', toastType: 'success' });
  } catch (error) {
    showToast({ title: 'Unable to Cancel', message: error?.response?.data?.message || 'Could not cancel this order', toastType: 'error' });
  }
};

const buyAgain = (order) => {
  (order.items || []).forEach((item) => handleAddToCart(item));
  router.push('/cart');
};

const printInvoice = (order) => {
  const win = window.open('', '_blank', 'width=820,height=900');
  if (!win) {
    showToast({ title: 'Popup blocked', message: 'Allow pop-ups to view your invoice.', toastType: 'error' });
    return;
  }
  const rows = (order.items || []).map((item) => `
    <tr>
      <td>${item.name}${item.size ? ` (${item.size})` : ''}</td>
      <td style="text-align:center">${item.quantity}</td>
      <td style="text-align:right">$${(item.price || 0).toFixed(2)}</td>
      <td style="text-align:right">$${((item.price || 0) * item.quantity).toFixed(2)}</td>
    </tr>`).join('');
  win.document.write(`
    <!doctype html><html><head><title>Invoice ${order.orderNumber}</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;color:#1f2937;padding:40px;}
      h1{margin:0;font-size:24px;} .muted{color:#6b7280;font-size:13px;}
      .header{display:flex;justify-content:space-between;border-bottom:2px solid #1a365d;padding-bottom:16px;margin-bottom:24px;}
      table{width:100%;border-collapse:collapse;margin-top:16px;} th,td{padding:10px 8px;border-bottom:1px solid #e5e7eb;font-size:13px;}
      th{text-align:left;background:#f3f4f6;} .totals{margin-top:20px;margin-left:auto;width:280px;font-size:13px;}
      .totals div{display:flex;justify-content:space-between;padding:5px 0;} .total{font-weight:bold;border-top:2px solid #1a365d;padding-top:8px;font-size:16px;}
      .badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#e0f2fe;color:#075985;font-size:11px;font-weight:bold;}
    </style></head><body>
    <div class="header">
      <div><h1>JasmarKids</h1><p class="muted">${storeSettings.value.storeEmail || ''}<br/>${storeSettings.value.address || ''}</p></div>
      <div style="text-align:right"><h1>Invoice</h1><p class="muted">${order.orderNumber}<br/>${new Date(order.createdAt).toLocaleDateString()}</p></div>
    </div>
    <p class="muted">Billed to</p>
    <p><strong>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</strong><br/>
    ${order.customer?.address || ''}<br/>${order.customer?.city || ''}, ${order.customer?.state || ''} ${order.customer?.zipCode || ''}<br/>${order.customer?.country || ''}</p>
    <p><span class="badge">${order.status}</span> <span class="badge">${order.paymentStatus}</span></p>
    <table><thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="totals">
      <div><span>Subtotal</span><span>$${(order.subtotal || 0).toFixed(2)}</span></div>
      <div><span>Shipping</span><span>$${(order.shippingFee || 0).toFixed(2)}</span></div>
      <div><span>Tax</span><span>$${(order.tax || 0).toFixed(2)}</span></div>
      ${order.discountAmount ? `<div><span>Discount</span><span>-$${(order.discountAmount || 0).toFixed(2)}</span></div>` : ''}
      <div class="total"><span>Total</span><span>$${(order.totalAmount || 0).toFixed(2)}</span></div>
    </div>
    <p class="muted" style="margin-top:40px">Thank you for shopping with JasmarKids.</p>
    <button onclick="window.print()" style="margin-top:24px;background:#1a365d;color:#fff;border:none;border-radius:999px;padding:12px 24px;font-weight:bold;cursor:pointer">Print invoice</button>
    </body></html>`);
  win.document.close();
  win.focus();
};

const handleApplyDiscount = (code) => {
  navigator.clipboard.writeText(code);
  showToast(`Code ${code} copied to clipboard! Apply it at checkout.`);
};

const handleLogout = () => {
  document.cookie = 'accessToken=; Max-Age=0; path=/';
  document.cookie = 'refreshToken=; Max-Age=0; path=/';
  router.push('/login');
};
</script>
