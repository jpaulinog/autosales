<!doctype html>
<html {!! get_language_attributes() !!}>
  @include('partials.head')
  <body @php body_class() @endphp>
  <div id="canvas">
		<div id="box_wrapper">
    @php do_action('get_header') @endphp
    @include('partials.header')
    @yield('content')
    @php do_action('get_footer') @endphp
    @include('partials.footer')
    @php wp_footer() @endphp
      </div>
    </div>
  </body>
</html>
