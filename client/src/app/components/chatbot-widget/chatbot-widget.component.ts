import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot-widget',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.css'
})
export class ChatbotWidgetComponent {
  isOpen = false;
  messages: { text: string; sender: 'user' | 'bot'; isLink?: boolean; linkUrl?: string }[] = [];
  newMessage = '';
  loading = false;
  
  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private chatbotService: ChatbotService) {
    this.messages.push({
      text: 'Hi there! I am your ShopSphere Assistant. I can help you find products, check order status, or suggest outfits. How can I help?',
      sender: 'bot'
    });
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const userText = this.newMessage;
    this.messages.push({ text: userText, sender: 'user' });
    this.newMessage = '';
    this.loading = true;
    this.scrollToBottom();

    this.chatbotService.sendMessage(userText).subscribe({
      next: (res) => {
        if (res.success) {
          const reply = res.reply;
          this.messages.push({ text: reply.text, sender: 'bot' });
          
          if (reply.action === 'navigate' && reply.data?.category) {
             this.messages.push({ 
               text: 'Click here to view products in this category.',
               sender: 'bot',
               isLink: true,
               linkUrl: `/shop?category=${reply.data.category}`
             });
          }
        }
        this.loading = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({ text: "Sorry, I'm having trouble connecting right now.", sender: 'bot' });
        this.loading = false;
        this.scrollToBottom();
      }
    });
  }

  private scrollToBottom(): void {
    if (this.chatBody) {
      setTimeout(() => {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }, 100);
    }
  }
}
