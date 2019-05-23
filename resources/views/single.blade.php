@extends('layouts.app')

@section('content')

<section class="ls s-py-80 s-py-lg-60 s-py-xl-160 c-gutter-30">
<div class="container">
  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-single-'.get_post_type())
  @endwhile
</div>
  
</section>

@endsection