<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $templateFile = 'index.html';

    public function firstLoader(Request $request)
    {
        if (!is_file($this->templateFile)) return '<h1>Something Went Wrong...</h1>';
        $template = file_get_contents($this->templateFile);

        $title = 'mytsv.com';
        $description = 'Videos';
        $keywords = 'videos';
        $image = 'mytsv.com';

        $placeHolders = '
            <meta name="title" content="'.$title.'">
            <meta name="description" content="'.$description.'">
            <meta name="keywords" content="'.$keywords.'">
            <meta name="og:image" content="'.$image.'">
        ';
        
        $template = str_replace('<placeholder_meta></placeholder_meta>', $placeHolders, $template);
        if (isset($title)) {
            $template = str_replace("<title></title>", "<title>{$title}</title>", $template);
        }

        return $template;
    }
    public function getVideos(Request $request){
        $paginate = $request->paginate ?? 15;
        $orderBy = $request->orderBy ?? 'id';

        $query = Video::query();

        if ($orderBy == 'popular') {
            $query->orderBy('views', 'desc');
        } elseif($orderBy == 'recommended') {
            $query->orderBy('likes', 'desc');
        } else {
            $query->orderBy('id', 'desc');
        }

        $list = $query->paginate($paginate);
        
        return response($list);
    }
    public function getUser(Request $request){

        $request->validate([
            'id'=>'required|integer',
        ]);

        $res = User::where('id', $request->id)->first();

        return response($res);
    }
    public function getCategories(Request $request){
        $res = Category::latest()->get();
        return response($res);
    }
}