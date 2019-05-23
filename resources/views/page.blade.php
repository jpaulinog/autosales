@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    @include('partials.content-page', [ 'class' => 'ls s-pt-55 s-pb-15 s-pt-lg-65 s-pb-lg-85 c-mb-20 text-center text-md-left'])
  @endwhile
@endsection
