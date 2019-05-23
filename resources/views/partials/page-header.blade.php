<div class="header_absolute s-parallax ds bs s-overlay">

  @include('partials/top-navigation')

  <section class="page_title ds s-pt-105 s-pb-50 s-pt-lg-75 s-pb-lg-60">
    <div class="divider-3 d-none d-lg-block"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center text-lg-left">{!! App::title() !!}</h1>
          {!! App::breadcrumbs() !!}
        </div>
      </div>
    </div>
  </section>
</div>