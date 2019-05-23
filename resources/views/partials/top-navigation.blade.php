<!--topline section visible only on small screens|-->
<section class="page_toplogo ds s-overlay s-py-lg-30">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-12">
        <div class="d-lg-flex justify-content-lg-end align-items-lg-center">
          <div class="mr-auto">
            <div class="d-none d-lg-flex justify-content-center justify-content-lg-start">
              <a href="{{ home_url('/') }}" class="logo pt-2">
                <img width="200" src="@asset('images/logo.svg')" alt="MPG Auto Sales">
              </a>
            </div>
          </div>
          <div class="d-flex justify-lg-content-end align-items-center meta-icons">
            <div class="d-none d-xl-block">
              <a href="#" data-toggle="modal" data-target="#modalLoginForm" class="btn btn-small btn-outline-maincolor btn-appointment">SCHEDULE MAINTENANCE</a>
            </div>
          </div>
        </div>
        <!-- header toggler -->
      </div>
    </div>
  </div>
</section>
<!--eof topline-->

<header class="page_header s-py-10 s-py-lg-0 ds ms s-overlay nav-bordered justify-nav-center">
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="d-lg-none col-11">
        <a href="{{ home_url('/') }}" class="logo pt-2">
          <img width="200" src="@asset('images/logo.svg')" alt="MPG Auto Sales">
        </a>
      </div>
      <div class="col-xl-12">
        <div class="nav-wrap">
          <!-- main nav start -->
          <nav class="top-nav">
            @if (has_nav_menu('primary_navigation'))
            {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav sf-menu']) !!}
            @endif
          </nav>
          <!-- eof main nav -->
        </div>
      </div>
    </div>
  </div>

  <!-- header toggler -->

  <span class="toggle_menu"><span></span></span>

</header>